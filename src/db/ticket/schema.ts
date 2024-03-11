import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

const ticketTable = pgTable("ticket", {
  ticket_id: serial("ticket_id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(), // Changed to varchar
  email: varchar("email", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 10 }).notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
});

export default ticketTable;