import React, { useState } from 'react';
import { SettingsContextTypes } from '../types/context';
import { createGenericContext } from './CreateContext';

const [useSettingContext, SettingContextProvider] =
  createGenericContext<SettingsContextTypes>();

const SettingProvider = ({ children }: { children: React.ReactNode }) => {
  const [PriLoading, setPriLoading] = useState(false);

  return (
    <SettingContextProvider value={{ PriLoading, setPriLoading }}>
      {children}
    </SettingContextProvider>
  );
};

export { useSettingContext, SettingProvider };
