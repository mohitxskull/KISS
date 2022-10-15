import React from 'react';
import {
  Header,
  Group,
  Button,
  Text,
  Box,
  useMantineTheme,
  Code,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';

export function HomeHeader() {
  const theme = useMantineTheme();
  const SmallScreen = useMediaQuery('(max-width: 550px)', true, {
    getInitialValueInEffect: false,
  });

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Group>
            <Text
              style={{
                fontFamily: 'DGE-B, sans-serif',
                fontSize: '50px',
                lineHeight: 0.9,
                userSelect: 'none',
                color: theme.fn.primaryColor(),
              }}
            >
              Kiss
            </Text>
            {!SmallScreen && (process.env.NEXT_PUBLIC_VERSION || null) && (
              <Code color="dark">{process.env.NEXT_PUBLIC_VERSION}</Code>
            )}
          </Group>

          <Group position="center" grow>
            <Button component={NextLink} href="/signin" variant="subtle">
              Log in
            </Button>
            <Button component={NextLink} href="/signup">
              Sign up
            </Button>
          </Group>
        </Group>
      </Header>
    </Box>
  );
}
