import type {Config} from "drizzle-kit";

export default {
    schema: "./src/data/schema.ts",
    out: "./drizzle",
    driver: 'pg',
    dbCredentials: {
        connectionString: "postgresql://blocket:blocket@localhost:5432/todo"
    }
}