import {
  Anchor,
  Badge,
  Card,
  Divider,
  Group,
  SimpleGrid,
  Text,
} from '@mantine/core';
// import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { ExternalLink } from 'tabler-icons-react';
import { ProxyUrl } from '../../../lib/consts';
import { useDashboardContext } from '../../../lib/context/Dashboard';
import CalcAgo from '../../../lib/helpers/CalcAgo';
import { ConfigTypes } from '../../../lib/types/world';

const ConfigListCard = ({ CONFIG }: { CONFIG: ConfigTypes }) => {
  const { SetDashboardState } = useDashboardContext();
  // const MakeLinkSmallTrigger = useMediaQuery('(max-width: 422px)', true, {
  //   getInitialValueInEffect: false,
  // });

  return (
    <>
      <Card
        onDoubleClick={() =>
          SetDashboardState({ state: 'updater', data: CONFIG })
        }
        mb="sm"
        sx={(theme) => ({
          cursor: 'pointer',
          userSelect: 'none',
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
        })}
      >
        <Group grow>
          <SimpleGrid cols={1} spacing={0}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <SimpleGrid cols={1} spacing={0}>
                <Text transform="capitalize" size="lg" weight="bold">
                  {CONFIG.name}
                </Text>

                <Anchor
                  href={CONFIG.links[0]}
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '150px',
                  }}
                  target="_blank"
                  size="xs"
                >
                  {CONFIG.links[0]}
                </Anchor>
              </SimpleGrid>

              <SimpleGrid cols={1} spacing={0}>
                <Group spacing={5}>
                  <Text weight="bold" size="sm">
                    C:
                  </Text>
                  <Text size="sm">{CalcAgo(CONFIG.createdAt)}</Text>
                </Group>

                <Group spacing={5}>
                  <Text weight="bold" size="sm">
                    U:
                  </Text>
                  <Text size="sm">
                    {CONFIG.updatedAt === CONFIG.createdAt
                      ? 'Not updated yet'
                      : CalcAgo(CONFIG.updatedAt)}
                  </Text>
                </Group>
              </SimpleGrid>
            </div>
            <Divider my={5} />
            <Group align="end" mt={5} spacing="xs" position="apart">
              <Group spacing="xs">
                <Badge
                  variant="outline"
                  color={CONFIG.active ? 'green' : 'red'}
                >
                  {CONFIG.active ? 'Active' : 'Inactive'}
                </Badge>

                <Badge variant="outline">
                  {CONFIG.proxy ? 'Proxy' : 'Redirect'}
                </Badge>
              </Group>

              <Group>
                <Anchor
                  href={`${ProxyUrl}/k/${CONFIG._id}`}
                  lineClamp={1}
                  target="_blank"
                  size="xs"
                >
                  <Group spacing={3} align="start">
                    {CONFIG._id}
                    <ExternalLink size={15} />
                  </Group>
                </Anchor>
              </Group>
            </Group>
          </SimpleGrid>
        </Group>
      </Card>
    </>
  );
};

export default ConfigListCard;
