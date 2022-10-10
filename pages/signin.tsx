import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';
import { Supabase } from '../lib/client/supabase.pub';
import SuspenseLoad from '../components/dynamic';
import { LoadingScreen } from '../components/Loading';

const DynamicSigninCom = dynamic(import('../components/signin/signin'), {
  suspense: true,
});

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await Supabase.auth.api.getUserByCookie(req);

  if (user) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const SignIn: NextPage = () => (
  <SuspenseLoad loading={<LoadingScreen />}>
    <DynamicSigninCom />
  </SuspenseLoad>
);

export default SignIn;
