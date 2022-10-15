import React, { Suspense } from 'react';
import { LoadingText } from './Loading';

const SuspenseLoad = ({
  children,
  loading = <LoadingText mt={100} />,
}: {
  children: React.ReactNode;
  loading?: React.ReactNode;
}) => <Suspense fallback={loading}>{children}</Suspense>;

export default SuspenseLoad;
