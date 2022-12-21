import { Conversation, User } from 'src/utils/typeorm';
import { CreateConversationParams } from 'src/utils/types';

export interface IConversationsService {
  createConversation(
    user: User,
    payload: CreateConversationParams,
  ): Promise<Conversation>;
  getConversations(id: number): Promise<Conversation[]>;
  findByID(id: number): Promise<Conversation>;
}
