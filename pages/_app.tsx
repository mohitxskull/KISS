import React from 'react';
import Head from 'next/head';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import { useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { ModalsProvider } from '@mantine/modals';
import { FingerprintProvider } from '../lib/context/Fingerprint';
import '../styles/world.css';
import '../styles/underline.css';

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

  // useEffect(() => {
  //   console.log(window.location.pathname);
  // }, []);

  return (
    <>
      <Head>
        <title>Kiss</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <SessionProvider
        session={session}
        refetchInterval={5 * 60}
        refetchOnWindowFocus
      >
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
              <ModalsProvider>
                <NotificationsProvider>
                  <Component {...pageProps} />
                </NotificationsProvider>
              </ModalsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </FingerprintProvider>
      </SessionProvider>
    </>
  );
}
