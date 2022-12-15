import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "./Conversation";

@Entity({ name: "chat_participant" })
export class ChatParticipant {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Conversation, conversations => conversations.participants)
    @JoinTable() 
    conversations: Conversation[]
}