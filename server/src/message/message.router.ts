import { Router } from "express";
import {
  createMessage,
  createMessageWithAsset,
  getMessages,
} from "./message.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { upload } from "../lib/multer.config";

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
            .json({ msg: "Limit and pagination info is required!" });
        else if (err instanceof Error)
          res.status(500).json({ msg: "Conversation not found!" });
        else res.status(500).json({ msg: err.message });
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
  })
  .post("/asset", upload.single("attachment"), async (req, res) => {
    const { file } = req;
    if (!file) return res.status(400).json({ msg: "File not found!" });

    // @ts-ignore
    const user = req.session.user!;
    const { content, id } = req.body;
    await createMessageWithAsset({ content, conversationId: id, user, file })
      .then((msg) => {
        res.status(201).send(JSON.parse(JSON.stringify(msg)));
      })
      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  });
