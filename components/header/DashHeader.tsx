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
import { signOut } from 'next-auth/react';
import { useMediaQuery } from '@mantine/hooks';
import ThemeToggleBtn from '../ThemeToggle';
import { useDashboardContext } from '../../lib/context/Dashboard';
import AddConfigModal from '../dashboard/components/AddConfigModal';

const DashHeader = () => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const MenuTrigger = useMediaQuery('(max-width: 593px)', true, {
    getInitialValueInEffect: false,
  });

  const {
    PriLoading,
    AddConfigModalState,
    setAddConfigModalState,
    HandleAddConfig,
    UpdateConfigList,
  } = useDashboardContext();

  const HandleLogout = () => {
    openConfirmModal({
      title: 'Please confirm your action',
      centered: true,
      withCloseButton: false,
      children: <Text size="sm">You wanna logout Human being? sure?</Text>,
      labels: { confirm: 'Logout', cancel: 'Cancle' },
      confirmProps: { color: 'red' },
      onCancel: () => {},
      onConfirm: () => signOut({ redirect: false }),
    });
  };

  return (
    <>
      <AddConfigModal
        Opened={AddConfigModalState}
        setClose={setAddConfigModalState}
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
            <Code color="dark">V:Embrasser:0.1.000-Beta</Code>
          </Group>

          {MenuTrigger ? (
            <Group spacing="xs">
              <ActionIcon
                onClick={UpdateConfigList}
                disabled={PriLoading}
                size="lg"
                variant="transparent"
              >
                <Refresh size={20} />
              </ActionIcon>
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
                  {/* <Menu.Label>Application</Menu.Label> */}
                  <Menu.Item
                    onClick={() => setAddConfigModalState(true)}
                    icon={<NewSection size={18} />}
                  >
                    Add config
                  </Menu.Item>
                  <Menu.Item icon={<Settings size={18} />}>Settings</Menu.Item>
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
              <ActionIcon
                onClick={UpdateConfigList}
                disabled={PriLoading}
                size="lg"
                variant="light"
              >
                <Refresh size={20} />
              </ActionIcon>
              <ActionIcon
                onClick={() => setAddConfigModalState(true)}
                disabled={PriLoading}
                size="lg"
                variant="light"
              >
                <NewSection size={20} />
              </ActionIcon>
              <ActionIcon disabled={PriLoading} size="lg" variant="light">
                <Settings size={20} />
              </ActionIcon>
              <ThemeToggleBtn />

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
