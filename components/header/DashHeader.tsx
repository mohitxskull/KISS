import React from 'react';
import {
  ActionIcon,
  Button,
  Code,
  Divider,
  Group,
  Header,
  Menu,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {
  Logout,
  Menu as MenuIcon,
  MoonStars,
  NewSection,
  Refresh,
  Settings,
  Sun,
} from 'tabler-icons-react';
import { openConfirmModal } from '@mantine/modals';
import { useMediaQuery } from '@mantine/hooks';
import ThemeToggleBtn from '../ThemeToggle';
import { useDashboardContext } from '../../lib/context/Dashboard';
import AddConfigModal from '../dashboard/components/AddConfigModal';
import SupabaseLogout from '../../lib/helpers/SupabaseLogout';

const DashHeader = () => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const MenuTrigger = useMediaQuery('(max-width: 593px)', true, {
    getInitialValueInEffect: false,
  });

  const {
    SetDashboardState,
    GetDashboardState,
    HandleAddConfig,
    UpdateConfigList,
  } = useDashboardContext();

  const DashboardState = GetDashboardState<null>();
  const PriLoading = DashboardState.state === 'loading';
  const StateIsList = DashboardState.state === 'list';

  const HandleLogout = () => {
    openConfirmModal({
      title: 'Please confirm your action',
      centered: true,
      withCloseButton: false,
      children: <Text size="sm">You wanna logout Human being? sure?</Text>,
      labels: { confirm: 'Logout', cancel: 'Cancle' },
      confirmProps: { color: 'red' },
      onCancel: () => {},
      onConfirm: () => SupabaseLogout(),
    });
  };

  return (
    <>
      <AddConfigModal
        Opened={DashboardState.modal === 'addConfig'}
        setClose={() => SetDashboardState({ modal: null })}
        HandleAddConfigFun={HandleAddConfig}
      />
      <Header height={70} mb="md" px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Group>
            <Text
              style={{
                fontFamily: 'DGE-B, sans-serif',
                fontSize: '50px',
                lineHeight: 0.9,
                userSelect: 'none',
                color: theme.fn.primaryColor(),
              }}
            >
              Kiss
            </Text>
            {(process.env.NEXT_PUBLIC_VERSION || null) && (
              <Code color="dark">{process.env.NEXT_PUBLIC_VERSION}</Code>
            )}
          </Group>

          {MenuTrigger ? (
            <Group spacing="xs">
              {StateIsList && (
                <ActionIcon
                  onClick={UpdateConfigList}
                  disabled={PriLoading}
                  size="lg"
                  variant="transparent"
                >
                  <Refresh size={20} />
                </ActionIcon>
              )}
              <Menu
                disabled={PriLoading}
                position="bottom-end"
                withArrow
                shadow="md"
                width={200}
              >
                <Menu.Target>
                  <ActionIcon variant="transparent">
                    <MenuIcon />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  {StateIsList && (
                    <>
                      <Menu.Item
                        onClick={() =>
                          SetDashboardState({ modal: 'addConfig' })
                        }
                        icon={<NewSection size={18} />}
                      >
                        Add config
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => SetDashboardState({ state: 'settings' })}
                        icon={<Settings size={18} />}
                      >
                        Settings
                      </Menu.Item>
                    </>
                  )}
                  <Menu.Item
                    onClick={() => toggleColorScheme()}
                    color={colorScheme === 'dark' ? 'yellow' : 'blue'}
                    icon={
                      colorScheme === 'dark' ? (
                        <Sun size={18} />
                      ) : (
                        <MoonStars size={18} />
                      )
                    }
                  >
                    {colorScheme === 'dark' ? <>Light</> : <>Dark</>}
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    onClick={HandleLogout}
                    color="red"
                    icon={<Logout size={18} />}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          ) : (
            <Group spacing="sm">
              {StateIsList && (
                <>
                  <ActionIcon
                    onClick={UpdateConfigList}
                    disabled={PriLoading}
                    size="lg"
                    variant="light"
                  >
                    <Refresh size={20} />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => SetDashboardState({ modal: 'addConfig' })}
                    disabled={PriLoading}
                    size="lg"
                    variant="light"
                  >
                    <NewSection size={20} />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => SetDashboardState({ state: 'settings' })}
                    disabled={PriLoading}
                    size="lg"
                    variant="light"
                  >
                    <Settings size={20} />
                  </ActionIcon>{' '}
                </>
              )}
              <ThemeToggleBtn variant="light" />

              <Divider orientation="vertical" />

              <Button disabled={PriLoading} onClick={HandleLogout} color="red">
                Logout
              </Button>
            </Group>
          )}
        </Group>
      </Header>
    </>
  );
};

export default DashHeader;
