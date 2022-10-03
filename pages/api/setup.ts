import type { NextApiRequest, NextApiResponse } from 'next';
import MongoDB from '../../lib/client/mongodb';
import { SetupInfoSchemaServer } from '../../lib/schemas/group';
import { APIResTypes } from '../../lib/types/world';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResTypes>
) {
  if (req.method === 'POST') {
    try {
      await SetupInfoSchemaServer.validateAsync(req.body);
    } catch (error: any) {
      console.error(error);
      res.status(404).json({
        Data: null,
        Error: error.message || 'Something not valid in setup info',
      });
      return;
    }

    try {
      const Settings = await MongoDB.collection('settings').findOne({
        _id: 'kiss',
      });

      if (!Settings) {
        await MongoDB.collection('settings').insertOne({
          ...req.body,
          _id: 'kiss',
        });

        res.status(200).json({ Data: 'OK', Error: null });
      } else {
        res.status(404).json({ Data: null, Error: 'You wanna die??' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ Data: null, Error: 'Check server logs' });
    }
  } else {
    res.status(400).json({ Data: null, Error: 'POST allowed' }); // 400 Bad Request
  }
}
