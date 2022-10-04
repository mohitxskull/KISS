import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import MongoDB from '../../../lib/client/mongodb';
import { APIResTypes, ConfigTypes } from '../../../lib/types/world';
import Capitalize from '../../../lib/helpers/Capitalize';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResTypes>
) {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    if (session) {
      const ID: string = Capitalize(req.body._id) || '';

      try {
        // eslint-disable-next-line newline-per-chained-call
        await Joi.string().min(0).max(10).required().validateAsync(ID);
      } catch (error: any) {
        console.error(error);
        res.status(404).json({
          Data: null,
          Error: error.message || 'Something not valid in req body',
        });
        return;
      }

      try {
        const ConfigInDb = await MongoDB.collection<ConfigTypes>(
          'configs'
        ).findOne({
          _id: ID,
        });

        if (ConfigInDb) {
          await MongoDB.collection<ConfigTypes>('configs').deleteOne({
            _id: ID,
          });

          res.status(200).json({ Data: 'OK', Error: null });
        } else {
          res.status(404).json({ Data: null, Error: 'Config not in database' });
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
