import { useListState } from '@mantine/hooks';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FetchPost } from '../helpers/FetchHelpers';
import CallNoti from '../helpers/NotiCaller';
import { DashboardContextTypes } from '../types/context';
import {
  APIResTypes,
  ConfigTypes,
  DashboardDataType,
  DashboardModalType,
  DashboardStateType,
  DashboardStateTypes,
} from '../types/world';
import { createGenericContext } from './CreateContext';

const [useDashboardContext, DashboardContextProvider] =
  createGenericContext<DashboardContextTypes>();

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [ConfigList, ConfigListHandler] = useListState<ConfigTypes>([]);

  const [DashboardState, setDashboardState] = useState<
    DashboardStateTypes<any>
  >({
    state: 'loading',
    modal: null,
    data: null,
  });

  const GetDashboardState = <T,>(): DashboardStateTypes<T> => DashboardState;

  const SetDashboardState = <T,>({
    modal = DashboardState.modal,
    state = DashboardState.state,
    data = DashboardState.data,
  }: {
    modal?: DashboardModalType;
    state?: DashboardStateType;
    data?: DashboardDataType<T>;
  }) => {
    setDashboardState({ modal, state, data });
  };

  const UpdateConfigList = async () => {
    SetDashboardState({ state: 'loading' });
    const Res = await fetch('/api/config/get');
    const ResBody: APIResTypes = await Res.json();

    if (Res.ok) {
      ConfigListHandler.setState(ResBody.Data);
    } else {
      SetDashboardState({ state: 'error', data: ResBody.Error });
    }

    SetDashboardState({ state: 'list' });
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
      SetDashboardState({ state: 'list', data: null });
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
      SetDashboardState({ state: 'list', data: null });
    } else {
      CallNoti('Error', ResBody.Error);
    }
  };

  useEffect(() => {
    UpdateConfigList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardContextProvider
      value={{
        ConfigList,
        ConfigListHandler,
        HandleAddConfig,
        UpdateConfigList,
        HandleUpdateConfig,
        HandleDeleteConfig,
        GetDashboardState,
        SetDashboardState,
      }}
    >
      {children}
    </DashboardContextProvider>
  );
};

export { useDashboardContext, DashboardProvider };
