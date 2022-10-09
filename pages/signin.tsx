import { GetServerSideProps, NextPage } from 'next';
import React, { lazy } from 'react';
import { Supabase } from '../lib/client/supabase.pub';
import SuspenseLoad from '../components/dynamic';
import { LoadingScreen } from '../components/Loading';

const DynamicSigninCom = lazy(() => import('../components/signin/signin'));

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
