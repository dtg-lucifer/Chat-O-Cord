import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChatParticipant } from "./ChatParticipant";

@Entity({ name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    _id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string

    @Column()
    userName: string

    @Column()
    @Exclude()
    password: string

    @OneToOne(() => ChatParticipant)
    @JoinColumn()
    participant: ChatParticipant
}