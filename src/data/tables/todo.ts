import { boolean, date, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import {InferModel, relations} from 'drizzle-orm';
import { users } from './users';

export const todos = pgTable('todos', {
        id: serial('id').primaryKey(),
        authorId: integer('author_id').notNull(),
        contents: varchar('contents', { length: 256 }).notNull(),
        dateCreated: date('dateCreated').defaultNow(),
        isDone: boolean('isDone').default(false),
        isDeleted: boolean('isDeleted').default(false)
});

export const todosRelations = relations(todos, ({ one }) => ({
        author: one(users, {
                fields: [todos.authorId],
                references: [users.id]
        })
}));

export type Todo = InferModel<typeof todos>
export type NewTodo = InferModel<typeof todos, 'insert'>
