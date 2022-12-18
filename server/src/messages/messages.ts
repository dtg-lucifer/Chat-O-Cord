import { Message } from "src/utils/typeorm";

export interface IMessageService {
    createMessage(): Promise<Message>
}