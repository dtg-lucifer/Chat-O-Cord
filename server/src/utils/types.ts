import { User } from "./typeorm"

export interface CreateUserDetails {
    email: string
    firstName: string
    lastName: string
    password: string
}

export interface ValidateUserCredentials {
    email: string
    password: string
}

export interface FindUserParams {
    _id?: number;
    email?: string;
    // password?: string;
}

export interface CreateConversationParams {
    authorID: number
    recipientID: number
    message: string
}

export interface FindParticipantsParams {
    id: number
}

export interface AuthenticatedRequest extends Request {
    user: User
}