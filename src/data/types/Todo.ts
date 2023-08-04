import {User} from "./User";

export interface Todo {
    id: number;
    authorId: number;
    contents: string;
    dateCreated: Date;
    isDone: boolean;
    isDeleted: boolean;
    user: User
}