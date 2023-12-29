import { NextFunction, Request, Response } from "express";

export const AuthGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
	// @ts-ignore
	const user = req.session.user;
	
	if (!user) {
		// @ts-ignore
		if (res !== {}) return next(new Error("UNAUTHORIZED"));
		else return next(new Error("UNAUTHORIZED"));
	};

	return next();
};
