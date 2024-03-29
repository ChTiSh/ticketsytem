import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../db/index';
import {ticket} from '../../../db/ticketTable/schema';
import { Ticket } from '../../../db/ticketTable/schema';
import { eq } from 'drizzle-orm';

export const config = {
  api: {
    bodyParser: true,
  },
  runtime: 'nodejs',
};

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request:NextRequest, res: NextResponse) {
  const tickets: Ticket[] = await db.select().from(ticket);
  return Response.json({ tickets })
}

export async function POST(req:NextRequest, res: NextResponse) {
  const data = await req.json();
  console.log(data, 'data in apiticketdata'); // Now data will be logged
  const insertedTicket = await db.insert(ticket).values(data)
  console.log('Inserted Ticket:', insertedTicket);  
  return Response.json(data)
}
 
// export default async function handler(
//   req: NextRequest,
//   res: NextResponse
// ) {  
//   const method = req.method;
//   let data = null; // Initialize data with a default value

//   if (method === 'POST') {
//     const body = await req.text();
//     data = JSON.parse(body);
//   }

//   //console.log(data, 'data in apiticketdata'); // Now data will be logged

//   if (method === 'GET') {
//     try {
//       const tickets: Ticket[] = await db.select().from(ticket);
//       return NextResponse.json(tickets);
//     } catch (error) {
//       console.error('Error fetching tickets:', error);
//       return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//     }
//   } else if (method === 'POST') {
//     try {
//       const insertedTicket = await db.insert(ticket).values(data)
//       console.log('Inserted Ticket:', insertedTicket);  
//       return NextResponse.json(insertedTicket, { status: 201 });
//     }
//      catch (error) {
//       console.error('Error creating a ticket:', error);
//       return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//     }
//   } else {
//     return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
//   }
// }


