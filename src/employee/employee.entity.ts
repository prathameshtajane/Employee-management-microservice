import {Entity, Column, PrimaryGeneratedColumn, Unique} from 'typeorm';

@Entity()
export class Employee {

    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column({ length: 500 })
    _name: string;

    @Column('text')
    _description: string;

    @Column()
    _filename: string;

    @Column('int')
    _views: number;

    @Column()
    _isPublished: boolean;

    public get isPublished(): boolean {
        return this._isPublished;
    }

    public set isPublished(value: boolean) {
        this._isPublished = value;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get filename(): string {
        return this._filename;
    }

    public set filename(value: string) {
        this._filename = value;
    }

    public get views(): number {
        return this._views;
    }

    public set views(value: number) {
        this._views = value;
    }
}