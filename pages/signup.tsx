import { GetServerSideProps, NextPage } from 'next';
import React, { lazy } from 'react';
import { Supabase } from '../lib/client/supabase.pub';
import SuspenseLoad from '../components/dynamic';
import { LoadingScreen } from '../components/Loading';

const DynamicSignupCom = lazy(() => import('../components/signup/signup'));

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

const SignUp: NextPage = () => (
  <SuspenseLoad loading={<LoadingScreen />}>
    <DynamicSignupCom />
  </SuspenseLoad>
);

export default SignUp;
