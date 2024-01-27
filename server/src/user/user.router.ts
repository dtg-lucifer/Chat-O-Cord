import express from "express";
import { searchUsers } from "./user.service";

export const userRouter = express.Router();

userRouter
  .get("/search", async (req, res) => {
    const { userName } = req.query as { userName: string };
    await searchUsers(userName)
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err: Error) => {
        res.status(404).json(err.message);
      });
  });
