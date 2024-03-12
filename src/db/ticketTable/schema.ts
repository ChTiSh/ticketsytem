import { pgTable, serial, text, varchar, timestamp, pgSchema } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import response from "../responseTable/schema";

export const ticketSchema = pgSchema("ticket_schema")
console.log('ticketSchema', ticketSchema)
export const ticket = pgTable("ticket", {
  ticket_id: serial("ticket_id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(), // Changed to varchar
  email: varchar("email", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 10 }).notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
});

export const categoriesRelations = relations(ticket, ({ many }) => ({
  responses: many(response),
}));


export type Ticket = typeof ticket.$inferSelect;
export type NewTicket = typeof ticket.$inferInsert;