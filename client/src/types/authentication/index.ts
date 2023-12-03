export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  firstName: string;
  lastName: string;
  profilePic: string;
  userName?: string;
  confPassword: string;
}

export interface GetMessagesData {
  id: string;
  limit: number;
  page: number;
}