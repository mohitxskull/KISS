import {
  Center,
  DefaultMantineColor,
  Mark,
  SimpleGrid,
  Text,
} from '@mantine/core';
import React from 'react';

export const AlertCom = ({
  mt,
  title,
  color,
  msg,
  titleSize,
}: {
  mt: number;
  title: string;
  titleSize: number;
  color: DefaultMantineColor;
  msg: string;
}) => (
  <>
    <SimpleGrid spacing="xs" mt={mt}>
      <Center>
        <Mark color={color}>
          <Text weight="bold" size={titleSize}>
            {title}
          </Text>
        </Mark>
      </Center>
      <Center>
        <Text
          weight="bold"
          size="sm"
          sx={(theme) => ({
            userSelect: 'none',
            color:
              theme.colorScheme === 'dark'
                ? theme.colors.gray[6]
                : theme.colors.dark[7],
          })}
        >
          {msg}
        </Text>
      </Center>
    </SimpleGrid>
  </>
);
