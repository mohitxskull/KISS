import { Center, Loader, Text } from '@mantine/core';
import React from 'react';

export const LoadingScreen = ({ h = '100vh' }: { h?: string }) => (
  <>
    <Center style={{ height: h }}>
      <Loader variant="dots" />
    </Center>
  </>
);

export const LoadingText = ({ mt = 0 }: { mt?: number }) => (
  <>
    <Center mt={mt}>
      <Text className="Elloading" weight="bold">
        Loading
      </Text>
    </Center>
  </>
);
