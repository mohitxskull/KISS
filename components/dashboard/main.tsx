import { Alert, Code, Container, Group, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import React, { lazy } from 'react';
import { InfoCircle } from 'tabler-icons-react';
import { useDashboardContext } from '../../lib/context/Dashboard';
import { SettingProvider } from '../../lib/context/Settings';
import { AlertCom } from '../AlertCom';
import SuspenseLoad from '../dynamic';
import { NoProxyConfigs } from '../EmptyMsgCom';
import { DashFooter } from '../footer/DashFooter';
import DashHeader from '../header/DashHeader';
import { LoadingText } from '../Loading';
import ConfigListCard from './components/ConfigListCard';

const DynamicSettingsCard = lazy(() => import('../setting/Card'));
const DynamicUpdater = lazy(() => import('./components/Updater/Updater'));

const Dashboard = () => {
  const [TutorialState, setTutorialState] = useLocalStorage<boolean>({
    key: 'kiss-tutorial',
    defaultValue: true,
    getInitialValueInEffect: true,
  });

  const { GetDashboardState, ConfigList } = useDashboardContext();

  const DashboardState = GetDashboardState<string>();

  return (
    <>
      <div className="layout">
        <div className="row header">
          <DashHeader />
        </div>
        <div className="row content">
          {DashboardState.state === 'loading' && <LoadingText mt={100} />}

          {DashboardState.state === 'error' && (
            <AlertCom
              titleSize={40}
              mt={100}
              title="Error while fetching config list"
              color="red"
              msg={DashboardState.data || 'Error'}
            />
          )}

          <Container mb="xl">
            {DashboardState.state === 'settings' && (
              <SuspenseLoad>
                <SettingProvider>
                  <DynamicSettingsCard />
                </SettingProvider>
              </SuspenseLoad>
            )}

            {DashboardState.state === 'updater' && (
              <SuspenseLoad>
                <DynamicUpdater />
              </SuspenseLoad>
            )}

            {DashboardState.state === 'list' &&
              (ConfigList.length > 0 ? (
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
                    ConfigList.map((CONFIG) => (
                      <ConfigListCard CONFIG={CONFIG} />
                    ))
                  )}
                </>
              ) : (
                <NoProxyConfigs mt={100} msg="No Configs" />
              ))}
          </Container>
        </div>
        <div className="row footer">
          <DashFooter />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
