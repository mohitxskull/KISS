import { GetServerSideProps, NextPage } from 'next';
import React, { lazy } from 'react';
import SuspenseLoad from '../components/dynamic';
import { LoadingScreen } from '../components/Loading';
import { Supabase } from '../lib/client/supabase.pub';
import { DashboardProvider } from '../lib/context/Dashboard';

const DynamicDashComponent = lazy(() => import('../components/dashboard/main'));

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
