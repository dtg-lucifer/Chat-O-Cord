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
    if (req.session.user) {
			// @ts-ignore
      const user = req.session.user as User;
      return createConversation(user);
    } else {
      res.status(401).send("UNAUTHORIZED");
    }
  });
