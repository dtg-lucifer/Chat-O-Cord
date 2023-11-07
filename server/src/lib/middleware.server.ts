import { NextFunction, Request, Response } from "express";

export const AuthGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
	// @ts-ignore
	const user = req.session.user;

	if (!user) return res.status(401).send("UNAUTHORIZED");

	return next();
};
