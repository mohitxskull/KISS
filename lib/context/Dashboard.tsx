import { useListState } from '@mantine/hooks';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FetchPost } from '../helpers/FetchHelpers';
import CallNoti from '../helpers/NotiCaller';
import { DashboardContextTypes } from '../types/context';
import { APIResTypes, ConfigTypes } from '../types/world';
import { createGenericContext } from './CreateContext';

const [useDashboardContext, DashboardContextProvider] =
  createGenericContext<DashboardContextTypes>();

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [ConfigList, ConfigListHandler] = useListState<ConfigTypes>([]);

  const [PriLoading, setPriLoading] = useState(true);
  const [AddConfigModalState, setAddConfigModalState] = useState(false);

  const [FetchError, setFetchError] = useState<string | null>(null);
  const [Origin, setOrigin] = useState<string | null>(null);
  const [ConfigToUpdate, setConfigToUpdate] = useState<ConfigTypes | null>(
    null
  );

  const UpdateConfigList = async () => {
    setPriLoading(true);
    const Res = await fetch('/api/config/get');
    const ResBody: APIResTypes = await Res.json();

    if (Res.ok) {
      ConfigListHandler.setState(ResBody.Data);
    } else {
      setFetchError(ResBody.Error);
    }
    setTimeout(
      () => {
        setPriLoading(false);
      },
      process.env.NODE_ENV === 'development' ? 500 : 2000
    );
  };

  const HandleUpdateConfig = async (
    CONFIG: Omit<ConfigTypes, 'createdAt' | 'updatedAt'>
  ) => {
    const Res = await FetchPost('/api/config/update', {
      ...CONFIG,
    });

    const ResBody: APIResTypes = await Res.json();

    if (Res.ok) {
      ConfigListHandler.applyWhere(
        (Configg) => Configg._id === CONFIG._id,
        () => ({ ...ResBody.Data })
      );
      CallNoti('Done', 'Config updated');
      setConfigToUpdate(null);
    } else {
      CallNoti('Error', ResBody.Error);
    }
  };

  const HandleAddConfig = async (
    NAME: string,
    SETCLOSE: Dispatch<SetStateAction<boolean>>
  ) => {
    const Res = await FetchPost('/api/config/add', {
      name: NAME,
    });

    const ResBody: APIResTypes = await Res.json();

    if (Res.ok) {
      ConfigListHandler.append(ResBody.Data);
      CallNoti('Done', 'Config added');
      SETCLOSE(false);
    } else {
      CallNoti('Error', ResBody.Error);
    }
  };

  const HandleDeleteConfig = async (ID: string) => {
    const Res = await FetchPost('/api/config/delete', {
      _id: ID,
    });

    const ResBody: APIResTypes = await Res.json();

    if (Res.ok) {
      const ConfigIndex = ConfigList.findIndex((Configg) => Configg._id === ID);

      ConfigListHandler.remove(ConfigIndex);
      CallNoti('Done', 'Config deleted');
      setConfigToUpdate(null);
    } else {
      CallNoti('Error', ResBody.Error);
    }
  };

  useEffect(() => {
    UpdateConfigList();
    setOrigin(window.location.origin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardContextProvider
      value={{
        ConfigList,
        ConfigListHandler,
        PriLoading,
        setPriLoading,
        AddConfigModalState,
        setAddConfigModalState,
        HandleAddConfig,
        FetchError,
        UpdateConfigList,
        Origin,
        ConfigToUpdate,
        setConfigToUpdate,
        HandleUpdateConfig,
        HandleDeleteConfig,
      }}
    >
      {children}
    </DashboardContextProvider>
  );
};

export { useDashboardContext, DashboardProvider };
