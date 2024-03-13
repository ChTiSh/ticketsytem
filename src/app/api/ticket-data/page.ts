

// import { NextApiRequest, NextApiResponse } from 'next';
// import { db } from '../../../db/index';
// import { ticket } from '../../../db/ticketTable/schema';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const method = req.method;

//   if (method === 'GET') {
//     try {
//       // Fetch tickets using your database abstraction
//       const tickets = await db.select().from(ticket);
//       res.status(200).json(tickets);
//     } catch (error) {
//       console.error('Error fetching tickets:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else if (method === 'POST') {
//     try {
//       // Insert a new ticket using the parsed request body
//       const insertedTicket = await db
//         .insert(ticket)
//         .values(req.body)

//       res.status(201).json(insertedTicket);
//     } catch (error) {
//       console.error('Error creating a ticket:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).end(`Method Not Allowed`);
//   }
// }