import { Center, SimpleGrid, Skeleton, Text } from '@mantine/core';
import React from 'react';

export const NoProxyConfigs = ({ mt, msg }: { mt: number; msg: string }) => (
  <>
    <SimpleGrid spacing="xs" mt={mt}>
      <Center>
        <Skeleton animate={false} height={25} width="20%" radius="sm" />
      </Center>
      <Center>
        <Skeleton animate={false} height={25} width="20%" radius="sm" />
      </Center>
      <Center>
        <Skeleton animate={false} height={25} width="20%" radius="sm" />
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
