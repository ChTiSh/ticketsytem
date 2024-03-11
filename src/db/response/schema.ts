import { pgTable, serial, integer,varchar, text, timestamp } from "drizzle-orm/pg-core";
import ticket from "../ticket/schema";

const responseTable = pgTable("response", {
  response_id: serial("response_id").primaryKey(),
  ticket_id: integer("ticket_id")
    .notNull()
    .references(() => ticket.ticket_id, { onDelete: "cascade" }),
  responder_name: varchar("responder_name", { length: 100 }).notNull(),
  response: text("response").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export default responseTable;