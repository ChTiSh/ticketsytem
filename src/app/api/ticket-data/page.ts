import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db/index';
import {ticket} from '../../../db/ticketTable/schema';
import { Ticket } from '../../../db/ticketTable/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export const config = {
  api: {
    bodyParser: true,
  },
  runtime: 'nodejs',
};
 
export default async function handler(
  req: Request,
  res: NextResponse
) {  
  const method = req.method;
  let data = null; // Initialize data with a default value

  if (method === 'POST') {
    const body = await req.text();
    data = JSON.parse(body);
  }

  //console.log(data, 'data in apiticketdata'); // Now data will be logged

  if (method === 'GET') {
    try {
      const tickets: Ticket[] = await db.select().from(ticket);
      return NextResponse.json(tickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  } else if (method === 'POST') {
    try {
      const insertedTicket = await db.insert(ticket).values(data)
      console.log('Inserted Ticket:', insertedTicket);  
      return NextResponse.json(insertedTicket, { status: 201 });
    }
     catch (error) {
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