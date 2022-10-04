import { Container } from '@mantine/core';
import React from 'react';
import { useDashboardContext } from '../../../lib/context/Dashboard';
import { AlertCom } from '../../AlertCom';
import { NoProxyConfigs } from '../../EmptyMsgCom';
import { LoadingText } from '../../Loading';
import ConfigListCard from './ConfigListCard';
import Updater from './Updater/Updater';

const ConfigListCom = () => {
  const { PriLoading, ConfigList, FetchError, ConfigToUpdate } =
    useDashboardContext();

  return (
    <>
      {PriLoading ? (
        <LoadingText mt={100} />
      ) : FetchError ? (
        <AlertCom
          titleSize={40}
          mt={100}
          title="Error while fetching config list"
          color="red"
          msg={FetchError}
        />
      ) : ConfigList.length > 0 ? (
        <Container mb="xl">
          {ConfigToUpdate ? (
            <Updater />
          ) : (
            React.Children.toArray(
              ConfigList.map((CONFIG) => <ConfigListCard CONFIG={CONFIG} />)
            )
          )}
        </Container>
      ) : (
        <NoProxyConfigs mt={100} msg="No Configs" />
      )}
    </>
  );
};

export default ConfigListCom;
