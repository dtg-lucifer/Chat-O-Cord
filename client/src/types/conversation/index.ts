import { RegisterData } from "../authentication";

export interface User extends RegisterData {
  id: string;
  userName: string;
  joinedOn: Date;
  profilePic: string;
  messages: Message[];
  createdConversationId: string | null;
  joinedConversationId: string | null;
}

export interface SafeUser extends Omit<Omit<User, "password">, "confPassword"> {}

export interface Message {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  userId: string;
  conversation: Conversation;
  conversationId: string;
  attachment: Attachment | null;
}

export interface Attachment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
}

export interface Conversation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  creator: User;
  recipient: User;
  messages: Message[];
}

export interface SideBarProps {
  activeConversationId?: string;
  activeGroup?: string;
}