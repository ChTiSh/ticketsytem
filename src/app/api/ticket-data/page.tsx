import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db/index';
import {ticket} from '../../../db/ticketTable/schema';
import { Ticket } from '../../../db/ticketTable/schema';

// GET /api/ticket-data
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('GET /api/ticket-data');
  console.log('res',res);
  if (req.method === 'GET') {
    const tickets = await (db.query as any).ticket.findMany(); // Specify the type of the findMany method as Ticket[]
    res.status(200).json(tickets);
  } else if (req.method === 'POST') {
    //const newTicket = await db.insert(ticket).values(req.body);
    const insertedTicketIds = await db
      .insert(ticket)
      .values(req.body)
      .returning({ ticket_id: ticket.ticket_id });
    const newTicketId = insertedTicketIds[0]; // Assuming you're inserting one ticket
    const newTicket = await (db.query as any).ticket.findFirst({
      with: {
        ticket_id: newTicketId,
      },
    });
    
    res.status(201).json(newTicket);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}