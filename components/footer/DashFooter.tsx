import React from 'react';
import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  Footer,
} from '@mantine/core';
import { BrandGithub, BrandInstagram } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function DashFooter() {
  const { classes } = useStyles();

  return (
    <Footer height={60} className={classes.footer}>
      <Container className={classes.inner}>
        <span
          // className="underline"
          style={{
            fontSize: '14px',
            fontFamily: 'Archiv-o, sans-serif',
            userSelect: 'none',
            cursor: 'pointer',
          }}
        >
          <a
            target="_blank"
            rel="noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
            href="https://mohitxskull.vercel.app"
          >
            Built & Designed by Skull
          </a>
        </span>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/servedbyskull"
          >
            <ActionIcon variant="transparent" size="lg">
              <BrandGithub size={18} />
            </ActionIcon>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://instagram.com/mohitxskull.dev"
          >
            <ActionIcon variant="transparent" size="lg">
              <BrandInstagram size={18} />
            </ActionIcon>
          </a>
        </Group>
      </Container>
    </Footer>
  );
}
