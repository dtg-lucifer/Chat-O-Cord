import * as dotenv from "dotenv";
import session from "express-session";
import express from "express";
import cors from "cors";
import { createClient } from "redis";
import RedisStore from "connect-redis";

import { authRouter } from "./auth/auth.router";
import { userRouter } from "./user/user.router";
import { conversationRouter } from "./conversations/conversation.router";
import { AuthGuard } from "./lib/middleware.server";

dotenv.config();

if (!process.env.PORT) process.exit(1);

const PORT: number = parseInt(process.env.PORT as string, 10) || 9999;
const BASE_URL: string = process.env.BASE_URL as string;
const app = express();

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

app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/user`, AuthGuard, userRouter);
app.use(`${BASE_URL}/conversation`, AuthGuard, conversationRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.on("exit", () => redisClient.disconnect());
