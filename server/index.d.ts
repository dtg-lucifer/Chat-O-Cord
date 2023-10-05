import { User } from "@prisma/client";
import { Session, SessionData } from "express-session";

declare module "express-session" {
  interface SessionData {
    user: Omit<User, "password">;
  }
}

declare global {
  namespace Express {
    interface Request {
      session: Session & Partial<SessionData>;
    }
  }
}
