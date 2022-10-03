import React from 'react';
import { Group, Text } from '@mantine/core';
import ThemeToggleBtn from '../ThemeToggle';

const ModalHeader = ({ title }: { title: string }) => (
  <Group p={0} m={0} position="apart">
    <Text weight="bold" size={30}>
      {title}
    </Text>
    <ThemeToggleBtn />
  </Group>
);

export default ModalHeader;
