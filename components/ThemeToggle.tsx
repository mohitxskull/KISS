import React from 'react';
import { useMantineColorScheme, ActionIcon } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

const ThemeToggleBtn = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="lg"
      variant="transparent"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.gray[9]
            : theme.colors.gray[0],
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
