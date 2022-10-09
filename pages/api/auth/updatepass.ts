import type { NextApiRequest, NextApiResponse } from 'next';
import { APIResTypes, ChangePassTypes } from '../../../lib/types/world';
import { Supabase } from '../../../lib/client/supabase.pub';
import { UpdatePassSchema } from '../../../lib/schemas/group';
import Bcrypt from '../../../lib/helpers/Bcrypt';
import { SupabaseService } from '../../../lib/client/supabase.pri';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResTypes>
) {
  if (req.method === 'POST') {
    const { user: usero } = await Supabase.auth.api.getUserByCookie(req);

    if (usero) {
      const Body: ChangePassTypes = req.body;

      try {
        await UpdatePassSchema.validateAsync(Body);
      } catch (error: any) {
        console.error(error);
        res.status(404).json({
          Data: null,
          Error: error.message || 'Something not valid in req body',
        });
        return;
      }

      try {
        const PassHash = {
          hashedPass: usero.user_metadata.hashedPass,
          lastPassChange: usero.user_metadata.lastPassChange,
        };

        const AllowPassChange = PassHash
          ? PassHash.lastPassChange < Date.now()
          : true;

        if (AllowPassChange) {
          const OldPassCheck = Bcrypt.Check(Body.oldPass, PassHash.hashedPass);

          if (OldPassCheck) {
            try {
              const { data: user, error } =
                await SupabaseService.auth.api.updateUserById(usero.id, {
                  password: Body.newPass,
                  user_metadata: {
                    hashedPass: Bcrypt.Hash(Body.newPass),
                    lastPassChange: Date.now() + 600000,
                  },
                });

              if (error) throw error;

              console.log(user);

              res.status(200).json({ Data: 'OK', Error: null });
            } catch (error: any) {
              console.log('1', error);
              res.status(404).json({
                Data: null,
                Error: error.error_description || error.message,
              });
              return;
            }
          } else {
            res.status(404).json({
              Data: null,
              Error: 'Incorrect old password',
            });
          }
        } else {
          res.status(404).json({
            Data: null,
            Error: `You can update your password after ${Math.round(
              (PassHash.lastPassChange - Date.now()) / 60000
            )} Min`,
          });
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
