import React from 'react';
import {
  useMantineColorScheme,
  ActionIcon,
  ActionIconVariant,
} from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

const ThemeToggleBtn = ({
  variant = 'light',
}: {
  variant?: ActionIconVariant;
}) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="lg"
      variant={variant}
      sx={(theme) => ({
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.yellow[4]
            : theme.colors.blue[6],
      })}
    >
      {colorScheme === 'dark' ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  );
};

export default ThemeToggleBtn;
