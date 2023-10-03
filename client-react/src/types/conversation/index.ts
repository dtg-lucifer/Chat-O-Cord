import { RegisterData } from "../authentication";

export interface User extends RegisterData, Omit<RegisterData, "userName"> {
  id: string;
  userName: string;
  joinedOn: Date;
  profilePic: string;
  messages: Message[];
}

export interface Message {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  conversation: Conversation;
}

export interface Conversation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  creator: User;
  recipient: User;
  messages: Message[];
}
