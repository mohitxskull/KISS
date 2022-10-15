import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import SuspenseLoad from '../components/dynamic';
import { LoadingScreen } from '../components/Loading';

const DynamicHomeCompo = dynamic(import('../components/home/home'), {
  suspense: true,
});

const Index: NextPage = () => (
  <>
    <SuspenseLoad loading={<LoadingScreen />}>
      <DynamicHomeCompo />
    </SuspenseLoad>
  </>
);
export default Index;
