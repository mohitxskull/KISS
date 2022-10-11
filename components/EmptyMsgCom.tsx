import { Center, SimpleGrid, Skeleton, Text } from '@mantine/core';
import React from 'react';

export const NoProxyConfigs = ({
  mt,
  msg,
  ani = false,
}: {
  mt: number;
  msg: string;
  ani?: boolean;
}) => (
  <>
    <SimpleGrid spacing="xs" mt={mt}>
      <Center>
        <Skeleton animate={ani} height={25} width="20%" radius="sm" />
      </Center>
      <Center>
        <Skeleton animate={ani} height={25} width="20%" radius="sm" />
      </Center>
      <Center>
        <Skeleton animate={ani} height={25} width="20%" radius="sm" />
      </Center>
      <Center>
        <Text
          weight="bold"
          sx={(theme) => ({
            userSelect: 'none',
            color:
              theme.colorScheme === 'dark'
                ? theme.colors.gray[6]
                : theme.colors.dark[7],
          })}
        >
          {msg}
        </Text>
      </Center>
    </SimpleGrid>
  </>
);
