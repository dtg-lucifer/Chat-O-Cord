import express, { Request, Response } from 'express';

export const userRouter = express.Router();

userRouter.get('/', (req: Request, res: Response) => {
	  res.send('Hello from user router');
})