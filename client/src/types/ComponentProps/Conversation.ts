import { User } from "../Utils/Authentication"

export interface Conversation {
    id: number
    createdAt: string
    creator: User
    recipient: User
}

export interface Message {
    id: number
    author: User
    createdAt: string
    content: string
}