import React, { Suspense } from 'react';
import { LoadingText } from './Loading';

const SuspenseLoad = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingText mt={100} />}>{children}</Suspense>
);

export default SuspenseLoad;
