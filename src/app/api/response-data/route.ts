import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../db/index';
import response from '@/db/responseTable/schema';

export default async function handler(
  req: NextRequest,
  res: NextResponse
) {
    const data = await res.json()
    if (req.method === 'GET') {
        console.log('GET /api/response-data');
        const responses = await (db.query as any).response.findMany();
        return Response.json(responses);
    } else if (req.method === 'POST') {
        console.log('POST /api/response-data');
        const newResponse = await db.insert(response).values(data).returning();
        return Response.json(newResponse);
    } else {
        return Response.json({ message: 'Method Not Allowed' });
    }
}