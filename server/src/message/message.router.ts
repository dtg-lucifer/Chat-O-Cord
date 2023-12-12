import { Router } from "express";
import { createMessage, getMessages } from "./message.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const messageRouter = Router();

messageRouter
  .get("/:id", (req, res) => {
    const { id } = req.params;
    const { limit, page } = req.query;
    getMessages(id, parseInt(limit as string))
      .then((msg) => {
        res.status(200).json(msg);
      })
      .catch((err) => {
        console.error(err);
        if (err instanceof PrismaClientValidationError)
          res
            .status(401)
            .json({ msg: "Limit and pageination info is required!" });
        else if (err instanceof Error)
          res
            .status(500)
            .json({ msg: "Conversation not found!" });
        else
          res
            .status(500)
            .json({ msg: err.message });
      });
  })
  .post("/", async (req, res) => {
    const { content, id } = req.body;
    // @ts-ignore
    const user = req.session.user!;
    await createMessage({ content, conversationId: id, user })
      .then((msg) => {
        res.status(201).json(msg);
      })
      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  });
