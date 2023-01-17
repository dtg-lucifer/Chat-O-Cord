import axios, { AxiosRequestConfig } from "axios";
import {
  CreateUserParams,
  LoginUserParams,
  User,
} from "../types/Utils/Authentication";
import { Conversation, Message } from "../types/ComponentProps/Conversation";

const { REACT_APP_API_BASE_URL } = process.env;
const axiosConfig: AxiosRequestConfig = { withCredentials: true };

export const RegisterUser = async (data: CreateUserParams) => {
  return await axios.post(
    `${REACT_APP_API_BASE_URL}/auth/register`,
    data,
    axiosConfig
  );
};

export const LoginUser = async (data: LoginUserParams) => {
  return await axios.post(
    `${REACT_APP_API_BASE_URL}/auth/login`,
    data,
    axiosConfig
  );
};

export const GetAuthDetails = () =>
  axios.get<User>(`${REACT_APP_API_BASE_URL}/auth/status`, axiosConfig);

export const getConversations = () =>
  axios.get<Conversation[]>(
    `${REACT_APP_API_BASE_URL}/conversations`,
    axiosConfig
  );

export const createConversation = (data: {
  email: string;
  message: string;
}) => {
  return axios.post<Conversation>(
    `${REACT_APP_API_BASE_URL}/conversations`,
    data,
    axiosConfig
  );
};

export const getConversationByID = (id: number) => {
  return axios.get<Conversation>(
    `${REACT_APP_API_BASE_URL}/conversations/${id}`,
    axiosConfig
  );
};

export const getConversationMessages = (id: number) => {
  return axios.get<{ id: number; messages: Message[] }>(
    `${REACT_APP_API_BASE_URL}/messages/${id}`,
    axiosConfig
  );
};

export const postNewMessage = (data: {
  content: string;
  conversationID: number;
}) => {
  return axios.post<Message>(
    `${REACT_APP_API_BASE_URL}/messages`,
    data,
    axiosConfig
  );
};
