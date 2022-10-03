import { AppProps } from 'next/app';
import Head from 'next/head';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import React from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { FingerprintProvider } from '../lib/context/Fingerprint';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const [colorScheme, setColorScheme] = useLocalStorage<'dark' | 'light'>({
    key: 'colourScheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = () =>
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Head>
        <title>Kiss</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <SessionProvider session={session}>
        <FingerprintProvider>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                colorScheme,
                primaryColor: 'grape',
                primaryShade: 6,
              }}
            >
              <NotificationsProvider>
                <Component {...pageProps} />
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </FingerprintProvider>
      </SessionProvider>
    </>
  );
}
