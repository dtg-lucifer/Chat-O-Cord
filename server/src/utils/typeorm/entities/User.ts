import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}