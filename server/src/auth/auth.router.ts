import express from "express";
import type { Request, Response } from "express";
import { validationResult } from "express-validator";

import { registerUser, loginUser } from "../auth/auth.service";

export const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
    }

    try {
        const { email, password } = req.body;
        const user = await loginUser({ email, password });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).send(err);
    }
});
