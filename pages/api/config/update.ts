import type { NextApiRequest, NextApiResponse } from 'next';
import MongoDB from '../../../lib/client/mongodb';
import { Supabase } from '../../../lib/client/supabase.pub';
import { FetchPost } from '../../../lib/helpers/FetchHelpers';
import { UpdateConfigSchema } from '../../../lib/schemas/group';
import { APIResTypes, ConfigTypes } from '../../../lib/types/world';
import { ProxyUrl } from '../../../lib/consts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResTypes>
) {
  if (req.method === 'POST') {
    const { user } = await Supabase.auth.api.getUserByCookie(req);

    if (user) {
      const Config: ConfigTypes = req.body;

      try {
        await UpdateConfigSchema.validateAsync(Config);
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
          _id: Config._id,
          userid: user.id,
        });

        if (ConfigInDb) {
          const NewConfig: Omit<ConfigTypes, 'createdAt'> = {
            ...Config,
            userid: user.id,
            updatedAt: Date.now(),
          };
          await MongoDB.collection<ConfigTypes>('configs').updateOne(
            {
              _id: Config._id,
              userid: user.id,
            },
            { $set: NewConfig }
          );

          FetchPost(
            `${ProxyUrl}/cache/update/config/update/${process.env.PROXY_PASS}/`,
            NewConfig
          ).then((updateres) =>
            console.log('Cache update res => ', updateres.status)
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
