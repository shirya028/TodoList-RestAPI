
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity('todos')
export class TodoEntity{
    @PrimaryColumn()
    id: string;
 
    @Column({nullable:true})
    title: string
 
    @Column({nullable:true})
    description: string
 
    @Column({nullable:true})
    dueDate: string

    @Column({nullable:true})
    currentState: string

    @Column({nullable:true})
    userId: number

}