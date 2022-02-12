CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR (250) NOT NULL,
	"notes" VARCHAR (250) NOT NULL,
  	"completed" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks"
	("todo", "notes")
VALUES ('complete weekend challenge', 'remember to commit often')