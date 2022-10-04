import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import React, { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import MongoDB from '../../lib/client/mongodb';
import FourZeroFour from '../404';
import SetupFormCom from '../../components/setup/SetupForm';
import SigninFormCom from '../../components/signin/SiginForm';
import Dashboard from '../../components/dashboard/main';
import { LoadingScreen } from '../../components/Loading';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const Settings = await MongoDB.collection('settings').findOne({
    _id: 'kiss',
  });

  if (Settings) {
    const session = await getSession(context);

    if (session) {
      return {
        props: { data: { State: 'authenticated', Data: {} } },
      };
    }
    return {
      props: { data: { State: 'unauthenticated', Data: {} } },
    };
  }

  return {
    props: { data: { State: 'setup', Data: {} } },
  };
};

const Backstage: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { status } = useSession();
  const [PriState, setPriState] = useState<
    '404' | 'setup' | 'unauthenticated' | 'authenticated' | 'loading'
  >(data.State);

  useEffect(() => {
    if (PriState !== '404' && PriState !== 'setup') {
      setPriState(status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div style={{ position: 'relative' }}>
      {PriState === '404' && <FourZeroFour />}
      {PriState === 'setup' && <SetupFormCom />}
      {PriState === 'unauthenticated' && <SigninFormCom />}
      {PriState === 'authenticated' && <Dashboard />}
      {PriState === 'loading' && <LoadingScreen />}
    </div>
  );
};

export default Backstage;
