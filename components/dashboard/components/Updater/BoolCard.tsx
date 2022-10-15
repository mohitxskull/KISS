import { createStyles, Group, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { BoolCardDataTypes } from '../../../../lib/types/world';

const useStyles = createStyles((theme) => ({
  item: {
    '& + &': {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
  },
}));

const BoolCard = ({ Data }: { Data: BoolCardDataTypes[] }) => {
  const { classes } = useStyles();
  const SmallerScreen = useMediaQuery('(max-width: 524px)', false);

  return (
    <>
      {React.Children.toArray(
        Data.map((OPTION) => (
          <Group
            position="apart"
            className={classes.item}
            noWrap={SmallerScreen}
            spacing="xl"
          >
            <div>
              <Text style={{ fontFamily: 'Poppins, sans-serif' }}>
                {OPTION.title}
              </Text>
              <Text
                size="xs"
                color="dimmed"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  maxWidth: `${OPTION.maxW}%`,
                }}
              >
                {OPTION.des}
              </Text>
            </div>
            {OPTION.com}
          </Group>
        ))
      )}
    </>
  );
};

export default BoolCard;
