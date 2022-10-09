import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import DashCom from '../components/dashboard/main';
import { Supabase } from '../lib/client/supabase.pub';
import { DashboardProvider } from '../lib/context/Dashboard';

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
  <>
    <DashboardProvider>
      <DashCom />
    </DashboardProvider>
  </>
);

export default Dashboard;
