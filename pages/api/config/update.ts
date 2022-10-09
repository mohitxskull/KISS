import type { NextApiRequest, NextApiResponse } from 'next';
import MongoDB from '../../../lib/client/mongodb';
import { Supabase } from '../../../lib/client/supabase.pub';
import { UpdateConfigSchema } from '../../../lib/schemas/group';
import { APIResTypes, ConfigTypes } from '../../../lib/types/world';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResTypes>
) {
  if (req.method === 'POST') {
    const { user } = await Supabase.auth.api.getUserByCookie(req);

    if (user) {
      const Body: ConfigTypes = req.body;

      try {
        await UpdateConfigSchema.validateAsync(Body);
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
          _id: Body._id,
          userid: user.id,
        });

        if (ConfigInDb) {
          const NewConfig: Omit<ConfigTypes, 'createdAt'> = {
            ...Body,
            userid: user.id,
            updatedAt: Date.now(),
          };
          await MongoDB.collection<ConfigTypes>('configs').updateOne(
            {
              _id: Body._id,
              userid: user.id,
            },
            { $set: NewConfig }
          );

          res.status(200).json({ Data: NewConfig, Error: null });
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
