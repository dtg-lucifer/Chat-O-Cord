import * as dotenv from "dotenv";
import session from "express-session";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { createClient } from "redis";
import RedisStore from "connect-redis";

import { AuthGuard } from "./lib/middleware.server";
import { authRouter } from "./auth/auth.router";
import { userRouter } from "./user/user.router";
import { conversationRouter } from "./conversations/conversation.router";
import { messageRouter } from "./message/message.router";

dotenv.config();

if (!process.env.PORT) {
  console.log("PORT is not defined");
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 9999;
const BASE_URL: string = process.env.BASE_URL as string;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cookie: true,
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
  },
  password: process.env.REDIS_PASSWORD,
});

redisClient
  .connect()
  .then(() => console.log("Redis connected"))
  .catch((err) => console.log(err));

//! MIDDLEWARES
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    name: "session.sid",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: new RedisStore({
      client: redisClient,
      prefix: "session:",
    }),
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//! API ROUTES
app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/user`, AuthGuard, userRouter);
app.use(`${BASE_URL}/conversation`, AuthGuard, conversationRouter);
app.use(`${BASE_URL}/message`, AuthGuard, messageRouter);

//! SOCKET.IO
io.on("connection", (socket) => {
  console.log("Socket connected", { id: socket.id });
});

//! SERVER
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.on("exit", () => redisClient.disconnect());
