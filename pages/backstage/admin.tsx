import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import React from 'react';
import { getSession } from 'next-auth/react';
import MongoDB from '../../lib/client/mongodb';
import FourZeroFour from '../404';
import SetupFormCom from '../../components/setup/SetupForm';
import SigninFormCom from '../../components/signin/SiginForm';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const Settings = await MongoDB.collection('settings').findOne({
    _id: 'kiss',
  });

  if (Settings) {
    const session = await getSession(context);

    console.log(session);

    if (session) {
      return {
        props: { data: { State: 'dashboard', Data: {} } },
      };
    }
    return {
      props: { data: { State: 'login', Data: {} } },
    };
  }

  return {
    props: { data: { State: 'setup', Data: {} } },
  };
};

const Backstage: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <div style={{ position: 'relative' }}>
    {data.State === '404' && <FourZeroFour />}
    {data.State === 'setup' && <SetupFormCom />}
    {data.State === 'login' && <SigninFormCom />}
    {data.State === 'dashboard' && <>dash</>}
  </div>
);

export default Backstage;
