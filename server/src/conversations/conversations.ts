import { ChatParticipant, Conversation, User } from "src/utils/typeorm";
import { CreateConversationParams } from "src/utils/types";

export interface IConversationsService {
    createConversation(user: User, payload: CreateConversationParams): Promise<Conversation>
    find(id: number): Promise<ChatParticipant>
    findConversationByID(id: number): Promise<Conversation>
}