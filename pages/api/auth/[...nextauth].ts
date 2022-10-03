import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import MongoDB from '../../../lib/client/mongodb';
import Bcrypt from '../../../lib/helpers/Bcrypt';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const Creds = await MongoDB.collection('settings').findOne({
          _id: 'kiss',
        });

        if (Creds) {
          if (
            username !== Creds.Username ||
            !Bcrypt.Check(password, Creds.Password)
          ) {
            throw new Error('invalid credentials');
          }

          return {
            id: 'kiss',
            username: Creds.Username,
          };
        }
        throw new Error('Setup not done yet!');
      },
    }),
  ],
  pages: {
    signIn: '/backstage/admin',
  },
};

export default NextAuth(authOptions);
