import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { authRouter } from './auth/auth.router';

dotenv.config();

if(!process.env.PORT) process.exit(1);

const PORT: number = parseInt(process.env.PORT as string, 10);
const BASE_URL: string = process.env.BASE_URL as string;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${BASE_URL}/auth`, authRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));