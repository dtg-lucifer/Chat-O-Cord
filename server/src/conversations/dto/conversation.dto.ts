import { User } from "@prisma/client";

export type CreateConversationDTO = {
  userName: string;
  self: User
};
