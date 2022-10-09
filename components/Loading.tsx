import { Center, Loader, Text } from '@mantine/core';
import React from 'react';

export const LoadingScreen = () => (
  <>
    <Center style={{ height: '100vh' }}>
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
