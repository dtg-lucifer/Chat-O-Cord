import { Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "./Conversation";
import { User } from "./User";

@Entity({ name: "chat_participant" })
export class ChatParticipant {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Conversation, conversations => conversations.participants)
    @JoinTable() 
    conversations: Conversation[]

    @OneToOne(() => User, user => user.participant)
    user: User
}