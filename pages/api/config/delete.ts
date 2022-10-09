import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';
import MongoDB from '../../../lib/client/mongodb';
import { APIResTypes, ConfigTypes } from '../../../lib/types/world';
import Capitalize from '../../../lib/helpers/Capitalize';
import { Supabase } from '../../../lib/client/supabase.pub';
import { ProxyUrl } from '../../../lib/consts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResTypes>
) {
  if (req.method === 'POST') {
    const { user } = await Supabase.auth.api.getUserByCookie(req);

    if (user) {
      const ProxyID = Capitalize(req.body._id);

      try {
        // eslint-disable-next-line newline-per-chained-call
        await Joi.string().min(0).max(10).required().validateAsync(ProxyID);
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
          _id: ProxyID,
          userid: user.id,
        });

        if (ConfigInDb) {
          await MongoDB.collection<ConfigTypes>('configs').deleteOne({
            _id: ProxyID,
            userid: user.id,
          });

          fetch(
            `${ProxyUrl}/cache/update/config/delete/${process.env.PROXY_PASS}/${ProxyID}`
          ).then((delres) =>
            console.log('Cache delete res => ', delres.status)
          );

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
