import { User } from "../Utils/Authentication"

export interface Conversation {
    id: number
    creator: User
    recipient: User
}