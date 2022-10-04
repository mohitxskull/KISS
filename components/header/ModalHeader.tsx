import React from 'react';
import { Group, Text } from '@mantine/core';
import ThemeToggleBtn from '../ThemeToggle';

const ModalHeader = ({
  title,
  size = 30,
}: {
  title: string;
  size?: number;
}) => (
  <Group p={0} m={0} position="apart">
    <Text weight="bold" size={size}>
      {title}
    </Text>
    <ThemeToggleBtn />
  </Group>
);

export default ModalHeader;
