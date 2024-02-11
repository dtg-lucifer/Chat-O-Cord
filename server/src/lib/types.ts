import { Attachment, Message } from "@prisma/client";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  firstName: string;
  lastName: string;
  profilePic?: string;
  userName?: string;
  confPassword: string;
}

export interface MessageWithAttachment extends Message {
  attachment: Attachment;
}