import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import {ticket, ticketSchema} from './ticketTable/schema'; 
import responseSchema from './responseTable/schema';
import dotenv from 'dotenv';
dotenv.config();

const schema = {
    ...ticketSchema,
    ...responseSchema,
}
if (!process.env.DATABASE_URL) {
    throw new Error("No database connection string provided.");
  }

const db = drizzle(
  neon(process.env.DATABASE_URL!),
  {schema} 
);

//await migrate(db, { migrationsFolder: "drizzle" });

export { db };