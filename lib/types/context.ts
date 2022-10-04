import { UseListStateHandlers } from '@mantine/hooks';
import { Dispatch, SetStateAction } from 'react';
import { ConfigTypes } from './world';

export type HandleAddConfig = (
  NAME: string,
  SETLOADING: Dispatch<SetStateAction<boolean>>
) => Promise<void>;

export type HandleUpdateConfig = (
  CONFIG: Omit<ConfigTypes, 'createdAt' | 'updatedAt'>
) => Promise<void>;

export type HandleDeleteConfig = (ID: string) => Promise<void>;

export interface DashboardContextTypes {
  ConfigList: ConfigTypes[];
  ConfigListHandler: UseListStateHandlers<ConfigTypes>;
  PriLoading: boolean;
  setPriLoading: Dispatch<SetStateAction<boolean>>;
  AddConfigModalState: boolean;
  setAddConfigModalState: Dispatch<SetStateAction<boolean>>;
  HandleAddConfig: HandleAddConfig;
  HandleUpdateConfig: HandleUpdateConfig;
  HandleDeleteConfig: HandleDeleteConfig;
  FetchError: string | null;
  UpdateConfigList: () => Promise<void>;
  Origin: string | null;
  ConfigToUpdate: ConfigTypes | null;
  setConfigToUpdate: Dispatch<SetStateAction<ConfigTypes | null>>;
}

export interface FingerprintContextTypes {
  Fingerprint: string | null;
}
