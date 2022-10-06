import type { NextApiRequest, NextApiResponse } from 'next';
import { Supabase } from '../../../lib/client/supabase';
import Bcrypt from '../../../lib/helpers/Bcrypt';
import LogError from '../../../lib/helpers/LogError';
import { SignSchema } from '../../../lib/schemas/group';
import { APIResTypes } from '../../../lib/types/world';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResTypes>
) {
  const AuthRes = await Supabase.auth.api.getUserByCookie(req);

  if (AuthRes.user) {
    res.redirect(301, '/');
  } else if (req.method === 'POST') {
    try {
      await SignSchema.validateAsync(req.body);
    } catch (error: any) {
      console.error(error);
      res.status(404).json({
        Data: null,
        Error: error.message || 'Something not valid in signup body',
      });
      return;
    }

    const HASHEDPASS = Bcrypt.Hash(req.body.password);

    try {
      const { error } = await Supabase.auth.signUp(
        {
          email: req.body.email,
          password: req.body.password,
        },
        {
          data: {
            hashedPass: HASHEDPASS,
            lastPassChange: null,
          },
        }
      );

      if (error) throw error;

      res.status(200).json({
        Data: 'Check your email for confirmation link!',
        Error: null,
      });
    } catch (error: any) {
      LogError(error, 'duringsignup');
      res.status(error.status || 400).json({
        Data: null,
        Error: `${error.error_description || error.message}`,
      });
    }
  } else {
    res.redirect(301, '/'); // .json({ Data: null, Error: "POST method" });
  }
}
