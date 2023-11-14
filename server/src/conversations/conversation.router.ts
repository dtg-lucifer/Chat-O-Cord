import { Router } from "express";
import { createConversation, getConversation } from "./conversation.service";

export const conversationRouter = Router();

conversationRouter
  .get("/d", (req, res) => {
    // @ts-ignore
    const { id } = req.session.user!;
    getConversation({ id })
      .then((conversations) => {
        if (!conversations)
          return res.status(404).json({ msg: "Conversation not found" });
        res.status(200).json(conversations);
      })
      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  })
  .post("/d", (req, res) => {
    // @ts-ignore
    const self = req.session.user!;
    const { userName } = req.body;

    if (!userName) return res.status(400).json({ msg: "userName is required" });

    createConversation({ self, userName })
      .then((conversation) => {
        res.status(201).json(conversation);
      })
      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  });
