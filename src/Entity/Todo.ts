import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    done: boolean;

    @Column()
    doneAt: Date;

    @Column()
    createdAt: Date;


    constructor(text: string, done: boolean, doneAt: Date, createdAt: Date) {
        this.text = text;
        this.done = done;
        this.doneAt = doneAt;
        this.createdAt = createdAt;
    }
}
