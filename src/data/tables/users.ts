import {PgTable, pgTable, serial, text} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {todos} from "./todo";

export const users : PgTable = pgTable('users',
    {
        id: serial('id').primaryKey(),
        email: text('email').notNull(),
        password: text('password').notNull()
    })
export const usersRelations = relations(users, ({many}) : {todos: any}=>({
    todos:many(todos)
}))