import {
  GetMessagesData,
  LoginData,
  RegisterData,
} from "../types/authentication";
import axios from "axios";
import { Attachment, Conversation, Message, User } from "../types/conversation";

export const registerUser = async (data: RegisterData) => {
  return await axios.post<Partial<Omit<User, "password">>>(
    `${process.env.REACT_APP_PUBLIC_API_URL}/auth/register`,
    data,
    {
      withCredentials: true,
      params: {
        redirect: "/",
      },
    }
  );
};

export const loginUser = async (data: LoginData) => {
  return await axios.post<Partial<Omit<User, "password">>>(
    `${process.env.REACT_APP_PUBLIC_API_URL}/auth/login`,
    data,
    {
      withCredentials: true,
      params: {
        redirect: "/",
      },
    }
  );
};

export const getStatus = async (path: string) => {
  return await axios.get<Omit<Omit<User, "password">, "confPassword">>(
    `${process.env.REACT_APP_PUBLIC_API_URL}/auth/me`,
    {
      withCredentials: true,
      params: {
        redirect: path,
      },
    }
  );
};

export const getOnlineUsers = async (path?: string) => {
  return await axios.get<User[]>(
    `${process.env.REACT_APP_PUBLIC_API_URL}/user/online`,
    {
      withCredentials: true,
      params: {
        redirect: path || "/",
      },
    }
  );
};

export const searchUsers = async (userName: string) => {
  return await axios.get<User[]>(
    `${process.env.REACT_APP_PUBLIC_API_URL}/user/search`,
    {
      withCredentials: true,
      params: {
        userName,
      },
    }
  );
};

export const getConversations = async (mode: string) => {
  return await axios.get<Conversation[]>(
    `${process.env.REACT_APP_PUBLIC_API_URL}/conversation/${mode}`,
    {
      withCredentials: true,
      params: {
        redirect: "/",
      },
    }
  );
};

export const createConversation = async (data: {
  userName: string;
  mode: string;
}) => {
  return await axios.post<Conversation>(
    `${process.env.REACT_APP_PUBLIC_API_URL}/conversation/${data.mode}`,
    data,
    {
      withCredentials: true,
    }
  );
};

export const getMessages = async (data: GetMessagesData) => {
  return await axios.get<{ id: string; messages: Message[] }>(
    `${process.env.REACT_APP_PUBLIC_API_URL}/message/${data.id}`,
    {
      withCredentials: true,
      params: {
        limit: data.limit,
        page: data.page,
      },
    }
  );
};

export const createMessage = async (data: { content: string; id: string }) => {
  return await axios.post<Message>(
    `${process.env.REACT_APP_PUBLIC_API_URL}/message`,
    data,
    { withCredentials: true }
  );
};

export const createMessageWithAsset = async (formData: FormData) => {
  return await axios.post<{ message: Message; attachment: Attachment }>(
    `${process.env.REACT_APP_PUBLIC_API_URL}/message/asset`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
