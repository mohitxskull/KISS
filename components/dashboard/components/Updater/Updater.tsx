import {
  Button,
  Card,
  Group,
  NumberInput,
  SimpleGrid,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { openConfirmModal } from '@mantine/modals';
import React, { useEffect, useState } from 'react';
import { useDashboardContext } from '../../../../lib/context/Dashboard';
import { BoolCardDataTypes, ConfigTypes } from '../../../../lib/types/world';
import ModalHeader from '../../../header/ModalHeader';
import BoolCard from './BoolCard';

const Updater = () => {
  const {
    GetDashboardState,
    SetDashboardState,
    HandleUpdateConfig,
    HandleDeleteConfig,
    Origin,
  } = useDashboardContext();

  const DashboardState = GetDashboardState<ConfigTypes>();

  const ConfigToUpdate = DashboardState.data;

  const [PriLoading, setPriLoading] = useState(false);

  const UpdateForm = useForm<ConfigTypes>({
    initialValues: {
      _id: '',
      name: '',
      userid: '',
      proxy: false,
      active: false,
      links: [],
      createdAt: 0,
      updatedAt: 0,
      options: {
        xfwd: false,
        changeOrigin: false,
        proxyTimeout: 0,
        timeout: 0,
        followRedirects: false,
      },
    },
  });

  const OptionCardData: BoolCardDataTypes[] = [
    {
      title: 'Change Origin',
      des: 'Changes the origin of the host header to the target URL',
      maxW: 90,
      com: (
        <Switch
          {...UpdateForm.getInputProps('options.changeOrigin', {
            type: 'checkbox',
          })}
        />
      ),
    },
    {
      title: 'Follow Redirects',
      des: 'Specify whether you want to follow redirects',
      com: (
        <Switch
          {...UpdateForm.getInputProps('options.followRedirects', {
            type: 'checkbox',
          })}
        />
      ),
      maxW: 100,
    },
    {
      title: 'xfwd',
      des: 'Adds x-forward headers',
      com: (
        <Switch
          {...UpdateForm.getInputProps('options.xfwd', { type: 'checkbox' })}
        />
      ),
      maxW: 100,
    },
    {
      title: 'Proxy Timeout',
      des: 'Timeout (in millis) for outgoing proxy requests',
      com: (
        <NumberInput
          style={{ width: '100px' }}
          {...UpdateForm.getInputProps('options.proxyTimeout')}
        />
      ),
      maxW: 100,
    },
    {
      title: 'Timeout',
      des: 'Timeout (in millis) for incoming requests',
      com: (
        <NumberInput
          style={{ width: '100px' }}
          {...UpdateForm.getInputProps('options.timeout')}
        />
      ),
      maxW: 100,
    },
  ];

  const GeneralCardData: BoolCardDataTypes[] = [
    {
      title: 'Config Active',
      des:
        (UpdateForm.values.links[0] || '').length < 13
          ? 'You cannot active config until you enter a valid target!'
          : '',
      maxW: 100,
      com: (
        <Switch
          disabled={(UpdateForm.values.links[0] || '').length < 13}
          {...UpdateForm.getInputProps('active', { type: 'checkbox' })}
        />
      ),
    },
    {
      title: 'Proxy',
      des: 'If disabled config will simply redirect to target',
      maxW: 100,
      com: (
        <Switch {...UpdateForm.getInputProps('proxy', { type: 'checkbox' })} />
      ),
    },
  ];

  useEffect(() => {
    if (ConfigToUpdate) {
      UpdateForm.setValues(ConfigToUpdate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ConfigToUpdate) {
      UpdateForm.setValues(ConfigToUpdate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ConfigToUpdate]);

  return (
    <Card
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      })}
    >
      <ModalHeader
        title="Config"
        rightbtn={
          <Button
            onClick={() => SetDashboardState({ state: 'list' })}
            variant="white"
            compact
          >
            Home
          </Button>
        }
      />
      <form
        onSubmit={UpdateForm.onSubmit(async (values) => {
          setPriLoading(true);
          await HandleUpdateConfig(values);
          setPriLoading(false);
        })}
      >
        <Group grow mb="md">
          <Button
            onClick={() => SetDashboardState({ state: 'list', data: null })}
            variant="default"
          >
            Cancle
          </Button>
          <Button loading={PriLoading} type="submit" color="green">
            Update
          </Button>
        </Group>

        <SimpleGrid cols={1} spacing="sm">
          <TextInput
            label="Config name"
            {...UpdateForm.getInputProps('name')}
          />
          <TextInput
            description={`${Origin}/${UpdateForm.values._id}`}
            label="Proxy id"
            value={UpdateForm.values._id}
            readOnly
            disabled
          />

          <TextInput
            label="Target"
            placeholder="https://www.startpage.com/"
            value={UpdateForm.values.links[0] || ''}
            onChange={(e) => {
              if (e.target.value.length < 13 && UpdateForm.values.active) {
                UpdateForm.setFieldValue('active', false);
              }
              UpdateForm.setFieldValue('links.0', e.target.value);
            }}
          />

          <Card
            withBorder
            p="lg"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[7]
                  : theme.white,
            })}
          >
            <BoolCard Data={GeneralCardData} />
          </Card>

          <Card
            withBorder
            p="lg"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[7]
                  : theme.white,
            })}
          >
            <BoolCard Data={OptionCardData} />
          </Card>

          <Card
            withBorder
            p="lg"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[7]
                  : theme.white,
            })}
          >
            <BoolCard
              Data={[
                {
                  title: 'Delete this config',
                  des: 'Proceed with caution! Action irreversible!',
                  maxW: 100,
                  com: (
                    <Button
                      onClick={() => {
                        openConfirmModal({
                          title: 'Please confirm your action',
                          centered: true,
                          withCloseButton: false,
                          children: (
                            <>
                              <Text size="sm">
                                Are you sure you want to delete your profile?
                                This action is destructive.
                              </Text>
                            </>
                          ),
                          labels: {
                            confirm: 'Delete config',
                            cancel: "No don't delete it",
                          },
                          confirmProps: { color: 'red' },
                          onCancel: () => {},
                          onConfirm: () => {
                            if (ConfigToUpdate) {
                              HandleDeleteConfig(ConfigToUpdate?._id);
                            }
                          },
                        });
                      }}
                      style={{ width: '100px' }}
                      color="red"
                      variant="light"
                    >
                      Delete
                    </Button>
                  ),
                },
              ]}
            />
          </Card>
        </SimpleGrid>
      </form>
    </Card>
  );
};

export default Updater;
