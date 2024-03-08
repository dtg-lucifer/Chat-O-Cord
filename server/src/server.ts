import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import {
  corsOptions,
  redisClient,
  sessionMiddleware,
  wrapper,
} from "./lib/session.server";
import { User, Message } from "@prisma/client";

import { AuthGuard } from "./middleware/middleware.server";
import { authRouter } from "./auth/auth.router";
import { userRouter } from "./user/user.router";
import { conversationRouter } from "./conversations/conversation.router";
import { messageRouter } from "./message/message.router";
import { gateWayMiddleware } from "./middleware/middleware.gateway";
import { setUserActiveStatusToggle } from "./user/user.service";
import { GatewaySession } from "./websocket/session.gateway";
import { cloudinaryConfig } from "./lib/cloudinary";
import { getConversation } from "./conversations/conversation.service";
import { conversationCreate, conversationJoin } from "./websocket/conversation.gateway";

dotenv.config();

if (!process.env.PORT) {
  console.log("PORT is not defined");
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 9999;
const BASE_URL: string = process.env.BASE_URL as string;
const SOCKET_SESSION = new GatewaySession();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cookie: true,
  cors: corsOptions,
});
cloudinaryConfig();

//! MIDDLEWARES
app.use(cors(corsOptions));
app.use(sessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
io.use(wrapper(sessionMiddleware));
io.use(wrapper(AuthGuard));
io.use(gateWayMiddleware);

//! API ROUTES
app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/user`, AuthGuard, userRouter);
app.use(`${BASE_URL}/conversation`, AuthGuard, conversationRouter);
app.use(`${BASE_URL}/message`, AuthGuard, messageRouter);
app.use(`${BASE_URL}/`, AuthGuard);

//! SOCKET.IO
io.on("connection", (socket) => {
  // @ts-ignore 
  const connectedUser: User = socket.request.session?.user;
  console.log("Socket connected", { id: socket.id });

  setUserActiveStatusToggle(connectedUser.id, true);
  SOCKET_SESSION.setSocket(connectedUser.id, socket);
  socket.broadcast.emit("user:connected", { userName: connectedUser.userName });

  getConversation({ id: connectedUser.id }).then((conversations) => {
    conversations?.forEach(async (c) => {
      await socket.join(c.id);
    });
  });

  socket.on(
    "conversation:join",
    (data) => {
      conversationJoin(io, socket, { ...data });
    }
  );

  socket.on(
    "conversation:create",
    (data) => {
      conversationCreate(SOCKET_SESSION, socket, io, data);
    }
  );

  socket.on(
    "typing:start",
    ({ convId, userName }: { convId: string; userName: string }) => {
      io.to(convId).emit("typing:started", { convId, userName });
    }
  );

  socket.on(
    "typing:stop",
    ({ convId, userName }: { convId: string; userName: string }) => {
      io.to(convId).emit("typing:stopped", { convId, userName });
    }
  );

  socket.on(
    "message:create",
    async (data: { message: Message; authorId: string; convId: string }) => {
      io.to(data.convId).emit("message:received", data);
    }
  );

  socket.on(
    "attachment:create",
    (data: {
      convId: string;
      secureUrl: string;
      message: Message;
      attachmentSrc: string;
    }) => {
      io.to(data.convId).emit("attachment:received", data);
    }
  );

  socket.on("disconnect", () => {
    setUserActiveStatusToggle(connectedUser.id, false);
    SOCKET_SESSION.removeSocket(connectedUser.id);
    socket.broadcast.emit("user:disconnected", {
      userName: connectedUser.userName,
    });
  });

  console.log("Socket session user:", {
    userName: connectedUser.userName,
  });
});

//! SERVER
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.on("exit", () => redisClient.disconnect());
