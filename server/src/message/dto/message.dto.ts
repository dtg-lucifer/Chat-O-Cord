import { User } from "@prisma/client";

export interface CreateMessageDTO {
	content: string;
	attachment?: string;
	conversationId: string;
	user: User;
}