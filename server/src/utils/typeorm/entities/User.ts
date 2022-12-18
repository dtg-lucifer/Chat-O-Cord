import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./Message";
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

    @OneToMany(() => Message, message => message.author)
    @JoinColumn()
    messages: Message[]
}