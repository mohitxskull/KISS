import { Alert, Code, Container, Group, SimpleGrid, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import React from 'react';
import { InfoCircle } from 'tabler-icons-react';
import { useDashboardContext } from '../../../lib/context/Dashboard';
import { AlertCom } from '../../AlertCom';
import { NoProxyConfigs } from '../../EmptyMsgCom';
import { LoadingText } from '../../Loading';
import ConfigListCard from './ConfigListCard';
import Updater from './Updater/Updater';

const ConfigListCom = () => {
  const [TutorialState, setTutorialState] = useLocalStorage<boolean>({
    key: 'kiss-tutorial',
    defaultValue: true,
    getInitialValueInEffect: true,
  });

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
            <>
              <Alert
                icon={<InfoCircle size={16} />}
                title="Tutorial!"
                style={{ display: TutorialState ? 'block' : 'none' }}
                withCloseButton
                variant="outline"
                mb="md"
                onClose={() => setTutorialState(false)}
              >
                <Group spacing={8}>
                  <Code>C</Code> <Text>- Created,</Text>
                  <Code>U</Code> <Text>- Updated</Text>
                </Group>
                <Group spacing={8} mt={5}>
                  <Code>Double Click</Code> <Text>To Open Config</Text>
                </Group>
              </Alert>
              {React.Children.toArray(
                ConfigList.map((CONFIG) => <ConfigListCard CONFIG={CONFIG} />)
              )}
            </>
          )}
        </Container>
      ) : (
        <NoProxyConfigs mt={100} msg="No Configs" />
      )}
    </>
  );
};

export default ConfigListCom;
