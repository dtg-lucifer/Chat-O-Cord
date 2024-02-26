import { Conversation, User } from "@prisma/client";
import { Server, Socket } from "socket.io";
import { GatewaySession } from "./session.gateway";

export const conversationJoin = (io: Server, socket: Socket, { convId, userId, userName }: { convId: string; userId: string; userName: string }) => {
	socket.join(convId);
	io.to(convId).emit("conversation:joined", { convId, userId, userName });
}

export const conversationCreate = (SOCKET_SESSION: GatewaySession, socket: Socket, io: Server, data: { conversation: Conversation; self: User }) => {
	const { conversation, self } = data;
	const userSocket =
		SOCKET_SESSION.getSocket(conversation.recipientId) || null;
	socket.join(conversation.id);
	if (userSocket) {
		userSocket.join(conversation.id);
	}
	io.to(conversation.id).emit("conversation:created", {
		conversation,
		self,
	});
}