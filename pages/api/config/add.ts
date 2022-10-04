import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import MongoDB from '../../../lib/client/mongodb';
import { APIResTypes, ConfigTypes } from '../../../lib/types/world';
import GetNano from '../../../lib/helpers/NanoIdGen';
import Capitalize from '../../../lib/helpers/Capitalize';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResTypes>
) {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    if (session) {
      const ConfigName: string = Capitalize(req.body.name) || '';

      try {
        // eslint-disable-next-line newline-per-chained-call
        await Joi.string().min(1).max(20).required().validateAsync(ConfigName);
      } catch (error: any) {
        console.error(error);
        res.status(404).json({
          Data: null,
          Error: error.message || 'Something not valid in req body',
        });
        return;
      }

      try {
        const Settings = await MongoDB.collection('configs').findOne({
          name: ConfigName,
        });

        const DefaultConfig: ConfigTypes = {
          _id: await GetNano(),
          name: ConfigName,
          proxy: true,
          active: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          links: ['https://google.com/'],
          options: {
            xfwd: true,
            changeOrigin: true,
            proxyTimeout: 10000,
            timeout: 10000,
            followRedirects: false,
          },
        };

        if (!Settings) {
          await MongoDB.collection<ConfigTypes>('configs').insertOne(
            DefaultConfig
          );

          res.status(200).json({ Data: DefaultConfig, Error: null });
        } else {
          res.status(404).json({ Data: null, Error: 'Name already there' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ Data: null, Error: 'Check server logs' });
      }
    } else {
      res.status(401).json({ Data: null, Error: 'Unauthorized' });
    }
  } else {
    res.status(400).json({ Data: null, Error: 'POST allowed' }); // 400 Bad Request
  }
}
