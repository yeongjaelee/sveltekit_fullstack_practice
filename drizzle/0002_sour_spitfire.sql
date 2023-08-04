CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" integer NOT NULL,
	"contents" varchar(256) NOT NULL,
	"dateCreated" date DEFAULT now(),
	"isDone" boolean DEFAULT false,
	"isDeleted" boolean DEFAULT false
);
