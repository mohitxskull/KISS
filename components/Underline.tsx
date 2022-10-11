import { DefaultMantineColor, useMantineTheme } from '@mantine/core';
import React from 'react';

const Underline = ({
  children,
  color = 'grape',
}: {
  children: React.ReactNode;
  color?: DefaultMantineColor;
}) => {
  const Theme = useMantineTheme();

  return (
    <>
      {' '}
      <span
        style={{
          textDecoration: 'underline',
          textDecorationColor: Theme.colors[color][6],
        }}
      >
        {children}
      </span>{' '}
    </>
  );
};

export default Underline;
