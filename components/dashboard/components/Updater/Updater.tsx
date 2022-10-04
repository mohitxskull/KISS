import {
  Box,
  Button,
  Card,
  Group,
  NumberInput,
  SimpleGrid,
  Switch,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import { useDashboardContext } from '../../../../lib/context/Dashboard';
import { BoolCardDataTypes, ConfigTypes } from '../../../../lib/types/world';
import BoolCard from './BoolCard';

const Updater = () => {
  const {
    ConfigToUpdate,
    setConfigToUpdate,
    Origin,
    HandleUpdateConfig,
    HandleDeleteConfig,
  } = useDashboardContext();

  const [PriLoading, setPriLoading] = useState(false);

  const UpdateForm = useForm<ConfigTypes>({
    initialValues: {
      _id: '',
      name: '',
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
    <Box mt="md">
      <form
        onSubmit={UpdateForm.onSubmit(async (values) => {
          setPriLoading(true);
          await HandleUpdateConfig(values);
          setPriLoading(false);
        })}
      >
        <Group grow>
          <Button onClick={() => setConfigToUpdate(null)} variant="default">
            Cancle
          </Button>
          <Button loading={PriLoading} type="submit" color="green">
            Update
          </Button>
        </Group>
        <Card mt="md" withBorder>
          <SimpleGrid cols={1} spacing="sm">
            <TextInput
              label="Config name"
              {...UpdateForm.getInputProps('name')}
            />
            <TextInput
              description={`${Origin}/${UpdateForm.values._id}`}
              label="Proxy id"
              {...UpdateForm.getInputProps('_id')}
            />

            <TextInput
              label="Target"
              placeholder="https://google.com/"
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
                          if (ConfigToUpdate) {
                            HandleDeleteConfig(ConfigToUpdate?._id);
                          }
                        }}
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
        </Card>
      </form>
    </Box>
  );
};

export default Updater;
