import React from 'react';
import { Center, Mark, Text } from '@mantine/core';
import { NextPage } from 'next';

const FourZeroFour: NextPage = () => (
  <Center style={{ height: '100vh' }}>
    <Mark>
      <Text weight="bolder" size={200}>
        404
        <Center>
          <Text size="xl">Nothing to see here!!</Text>
        </Center>
      </Text>
    </Mark>
  </Center>
);

export default FourZeroFour;
