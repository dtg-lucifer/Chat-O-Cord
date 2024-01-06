import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { AuthGuard } from "./middleware/middleware.server";
import { authRouter } from "./auth/auth.router";
import { userRouter } from "./user/user.router";
import { conversationRouter } from "./conversations/conversation.router";
import { messageRouter } from "./message/message.router";
import { gateWayMiddleware } from "./middleware/middleware.gateway";
import { Message, User } from "@prisma/client";
import {
  corsOptions,
  redisClient,
  sessionMiddleware,
  wrapper,
} from "./lib/session.server";
import { setUserActiveStatusToggle } from "./user/user.service";
import { GatewaySession } from "./websocket/session.gateway";

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

//! SOCKET.IO
io.on("connection", (socket) => {
  // @ts-ignore
  const connectedUser: User = socket.request.session?.user;
  console.log("Socket connected", { id: socket.id });

  setUserActiveStatusToggle(connectedUser.id, true);
  SOCKET_SESSION.setSocket(connectedUser.id, socket);
  socket.broadcast.emit("user:connected", { userName: connectedUser.userName });

  socket.on(
    "conversation:join",
    ({
      convId,
      userId,
      userName,
    }: {
      convId: string;
      userId: string;
      userName: string;
    }) => {
      socket.join(convId);
      io.to(convId).emit("conversation:joined", { convId, userId, userName });
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
    (data: { message: Message; authorId: string; convId: string }) => {
      socket.broadcast.emit("message:received", data);
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
