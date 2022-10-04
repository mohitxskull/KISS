import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import MongoDB from '../../../lib/client/mongodb';
import { APIResTypes } from '../../../lib/types/world';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResTypes>
) {
  if (req.method === 'GET') {
    const session = await getSession({ req });

    if (session) {
      try {
        console.log('\nGet hit!\n');

        const ConfigList = await MongoDB.collection('configs').find().toArray();

        res.status(200).json({ Data: ConfigList, Error: null });
      } catch (error) {
        console.error(error);
        res.status(500).json({ Data: null, Error: 'Check server logs' });
      }
    } else {
      res.status(401).json({ Data: null, Error: 'Unauthorized' });
    }
  } else {
    res.status(400).json({ Data: null, Error: 'GET allowed' }); // 400 Bad Request
  }
}
