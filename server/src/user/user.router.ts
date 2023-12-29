import express from "express";
import { getOnlineUsers } from "./user.service";

export const userRouter = express.Router();

userRouter.get("/online", async (req, res) => {
	// @ts-ignore
  const users = await getOnlineUsers(req.session.user?.id as string);
  res.status(200).json(users);
});
