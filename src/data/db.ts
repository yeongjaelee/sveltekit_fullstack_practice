import postgres from "postgres";
import {drizzle} from "drizzle-orm/postgres-js";
import {migrate} from "drizzle-orm/postgres-js/migrator";

const client = postgres('postgres://blocket:blocket@localhost:5432/todo')
export const db = drizzle(client);


await migrate(db, {migrationsFolder: 'drizzle'})
