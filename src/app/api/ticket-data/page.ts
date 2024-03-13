import { NextResponse } from 'next/server';
import { db } from '../../../db/index';
import { ticket } from '../../../db/ticketTable/schema';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req: Request) {
  const method = req.method;

  if (method === 'GET') {
    try {
      const tickets = await db.select().from(ticket);
      return NextResponse.json(tickets, { status: 200 });
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  } else if (method === 'POST') {
    try {
      const body = await req.text();
      const data = JSON.parse(body);
      const insertedTicket = await db.insert(ticket).values(data);
      return NextResponse.json(insertedTicket, { status: 201 });
    } catch (error) {
      console.error('Error creating a ticket:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }
}


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