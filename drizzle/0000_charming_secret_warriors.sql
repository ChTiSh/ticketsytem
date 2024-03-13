CREATE SCHEMA "response_schema";
--> statement-breakpoint
CREATE SCHEMA "ticket_schema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "response" (
	"response_id" serial PRIMARY KEY NOT NULL,
	"ticket_id" integer NOT NULL,
	"responder_name" varchar(100) NOT NULL,
	"response" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ticket" (
	"ticket_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"status" varchar(10) NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "response" ADD CONSTRAINT "response_ticket_id_ticket_ticket_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("ticket_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
