import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column({default: false})
    status: boolean
    
    @Column()
    todo: string
}