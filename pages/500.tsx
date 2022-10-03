import React from 'react';
import { Center, Mark, Text } from '@mantine/core';
import { NextPage } from 'next';

const FiveZeroZero: NextPage = () => (
  <Center style={{ height: '100vh' }}>
    <Mark>
      <Text weight="bolder" size={200}>
        500
        <Center>
          <Text size="xl">Woops! Something went wrong :( </Text>
        </Center>
      </Text>
    </Mark>
  </Center>
);

export default FiveZeroZero;
