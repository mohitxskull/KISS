import { ReactNode } from 'react';

export interface APIResTypes {
  Data: any;
  Error: any;
}

export interface SettingTypes {
  AdminAccessUrl: string;
  Username: string;
  Password: string;
}

export interface ConfigTypes {
  _id: string;
  userid: string;
  name: string;
  proxy: boolean;
  active: boolean;
  createdAt: number;
  updatedAt: number;
  links: string[];
  options: {
    xfwd: boolean;
    changeOrigin: boolean;
    proxyTimeout: number;
    timeout: number;
    followRedirects: boolean;
  };
}

export interface BoolCardDataTypes {
  title: string;
  des: string;
  com: ReactNode;
  maxW: number;
}
