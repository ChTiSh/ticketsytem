import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db/index';
import response from '@/db/responseTable/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'GET') {
        console.log('GET /api/response-data');
        const responses = await (db.query as any).response.findMany();
        res.status(200).json(responses);
    } else if (req.method === 'POST') {
        console.log('POST /api/response-data');
        const newResponse = await db.insert(response).values(req.body).returning();
        res.status(201).json(newResponse);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}