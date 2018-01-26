import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    private _id: number;

    @Column()
    private _firstName: string;

    @Column()
    private _lastName: string;

    @Column()
    private _age: number;

    @Column()
    private _password: string;

    constructor(id: number, firstName: string, lastName: string, age: number, password: string) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._age = age;
        this._password = password;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
}
