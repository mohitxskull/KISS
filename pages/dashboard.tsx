import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import SuspenseLoad from '../components/dynamic';
import { LoadingScreen } from '../components/Loading';
import { Supabase } from '../lib/client/supabase.pub';
import { DashboardProvider } from '../lib/context/Dashboard';

const DynamicDashComponent = dynamic(import('../components/dashboard/main'), {
  suspense: true,
});

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await Supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Dashboard: NextPage = () => (
  <SuspenseLoad loading={<LoadingScreen />}>
    <DashboardProvider>
      <DynamicDashComponent />
    </DashboardProvider>
  </SuspenseLoad>
);

export default Dashboard;
