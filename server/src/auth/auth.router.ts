import express from "express";
import type { Request, Response } from "express";
import { validationResult } from "express-validator";

import { registerUser, loginUser } from "../auth/auth.service";

export const authRouter = express.Router();

authRouter
  .post("/register", async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).send(errors.array());

    const { email, firstName, lastName, password } = req.body;
    return registerUser({ email, password, firstName, lastName })
      .then((user) => {
        // @ts-ignore
        req.session.user = user;
        res.status(201).json(user);
      })
      .catch((err) => res.status(500).json(err));
  })
  .post("/login", async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).send(errors.array());

    const { email, password } = req.body;
    return loginUser({ email, password })
      .then((user) => {
        // @ts-ignore
        req.session.user = user;
        res.status(200).json(user);
      })
      .catch((err) => res.status(500).json(err));
  })
  .get("/me", async (req: Request, res: Response) => {
    // @ts-ignore
    if (!req.session.user) {
      console.log("User not authenticated");
      return res.status(401).json({ message: "Unauthorized" });
    }
    // @ts-ignore
    return res.status(200).json(req.session.user);
  })
  .delete("/logout", async (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session", err);
        return res.status(500).json(err);
      }
      return res.status(200).json({ message: "Logged out" });
    });
  });
