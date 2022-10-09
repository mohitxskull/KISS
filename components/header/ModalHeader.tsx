import React, { ReactNode } from 'react';
import { Group, Text } from '@mantine/core';
import ThemeToggleBtn from '../ThemeToggle';

const ModalHeader = ({
  title,
  size = 30,
  mb = 10,
  rightbtn = <ThemeToggleBtn variant="transparent" />,
}: {
  title: string;
  size?: number;
  mb?: number;
  rightbtn?: ReactNode;
}) => (
  <Group p={0} m={0} mb={mb} position="apart">
    <Text weight="bold" size={size}>
      {title}
    </Text>
    {rightbtn}
  </Group>
);

export default ModalHeader;
