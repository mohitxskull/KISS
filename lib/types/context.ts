import { UseListStateHandlers } from '@mantine/hooks';
import { Dispatch, SetStateAction } from 'react';
import {
  ConfigTypes,
  DashboardDataType,
  DashboardModalType,
  DashboardStateType,
  DashboardStateTypes,
} from './world';

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
  HandleAddConfig: HandleAddConfig;
  HandleUpdateConfig: HandleUpdateConfig;
  HandleDeleteConfig: HandleDeleteConfig;
  UpdateConfigList: () => Promise<void>;
  GetDashboardState: <T>() => DashboardStateTypes<T>;
  SetDashboardState: <T>({
    modal,
    state,
    data,
  }: {
    modal?: DashboardModalType;
    state?: DashboardStateType;
    data?: DashboardDataType<T>;
  }) => void;
}

export interface FingerprintContextTypes {
  Fingerprint: string | null;
}

export interface SettingsContextTypes {
  PriLoading: boolean;
  setPriLoading: Dispatch<SetStateAction<boolean>>;
}
