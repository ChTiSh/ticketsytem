ALTER TABLE "response" DROP CONSTRAINT "response_ticket_id_ticket_ticket_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "response" ADD CONSTRAINT "response_ticket_id_ticket_ticket_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "ticket_schema"."ticket"("ticket_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "ticket" SET SCHEMA "ticket_schema";
