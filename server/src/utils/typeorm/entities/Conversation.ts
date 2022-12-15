import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChatParticipant } from "./ChatParticipant";

@Entity({ name: "conversations" })
export class Conversation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => ChatParticipant, chatParticipant => chatParticipant.conversations)
    participants: ChatParticipant[]
}