import { User } from './typeorm';
import { Socket } from "socket.io"

export interface CreateUserDetails {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface ValidateUserCredentials {
  email: string;
  password: string;
}

export interface FindUserParams {
  _id?: number;
  email?: string;
  username?: string;
}

export interface CreateConversationParams {
  recipientID: number;
  message: string;
}

export interface FindParticipantsParams {
  id: number;
}

export interface AuthenticatedRequest extends Request {
  user: User;
}

export interface CreateMessageParams {
  content: string;
  conversationID: number;
  user: User;
}

export interface AuthenticatedSocket extends Socket {
  user?: User
}