import { Router } from "express";
import { createConversation } from "./conversation.service";
import { User } from "@prisma/client";

export const conversationRouter = Router();

conversationRouter
  .get("/", (req, res) => {
    res.send("Hello from conversation router!");
  })
  .post("/", (req, res) => {
    // @ts-ignore
    return createConversation(req.session.user as User);
  });
