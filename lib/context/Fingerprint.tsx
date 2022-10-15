import React, { useEffect, useState } from 'react';
import { FingerprintContextTypes } from '../types/context';
import { createGenericContext } from './CreateContext';

const [useFingerprintContext, FingerprintContextProvider] =
  createGenericContext<FingerprintContextTypes>();

const FingerprintProvider = ({ children }: { children: React.ReactNode }) => {
  const [Fingerprint, setFingerprint] = useState<null | string>(null);

  useEffect(() => {
    import('@fingerprintjs/fingerprintjs')
      .then((FingerprintJS) => FingerprintJS.load())
      .then((fp) => fp.get())
      .then((result) => setFingerprint(result.visitorId));
  }, []);

  return (
    <FingerprintContextProvider value={{ Fingerprint }}>
      {children}
    </FingerprintContextProvider>
  );
};

export { useFingerprintContext, FingerprintProvider };
