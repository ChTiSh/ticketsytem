import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import ticketSchema from './ticket/schema'; 
import responseSchema from './response/schema';

neonConfig.fetchConnectionCache = true;
const schema = {
    ...ticketSchema,
    ...responseSchema,
}

const db = drizzle(
  neon(process.env.DRIZZLE_DATABASE_URL!),
  {schema} 
);

export { db };