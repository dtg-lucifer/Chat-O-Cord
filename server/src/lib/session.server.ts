import RedisStore from "connect-redis";
import { NextFunction } from "express";
import { Request, Response } from "express-serve-static-core";
import session from "express-session";
import { createClient } from "redis";
import { Socket } from "socket.io";
import * as dotenv from "dotenv";

dotenv.config();

export const redisClient = createClient({
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

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET as string,
  name: "session.sid",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  store: new RedisStore({
    client: redisClient,
    prefix: "session:",
  }),
});

export const wrapper =
  (
    expressMiddleware: (req: Request, res: Response, next: NextFunction) => void
  ) =>
  (socket: Socket, next: () => void) => {
    return expressMiddleware(socket.request as Request, {} as Response, next);
  };

export const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
