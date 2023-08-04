import {Todo} from "./Todo";

export interface User {
    id : number;
    email : string;
    todos: Todo[];
}