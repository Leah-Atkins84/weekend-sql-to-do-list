CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR (250) NOT NULL,
	"notes" VARCHAR (250) NOT NULL,
  	"completed" BOOLEAN DEFAULT false
);

