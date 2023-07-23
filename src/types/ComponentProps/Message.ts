import { User } from "../Utils/Authentication";
import { Message } from "./Conversation";

export interface MessageProps extends Message {
    recipient: User | undefined
    currentIndex?: number | undefined
    messages?: Message[] | undefined
}