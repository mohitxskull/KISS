import React, { useEffect } from 'react';
import Head from 'next/head';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import { useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { useRouter } from 'next/router';
import { FingerprintProvider } from '../lib/context/Fingerprint';
import '../styles/world.css';
import '../styles/underline.css';
import { Supabase } from '../lib/client/supabase.pub';
import { FetchPost } from '../lib/helpers/FetchHelpers';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const Router = useRouter();

  const [colorScheme, setColorScheme] = useLocalStorage<'dark' | 'light'>({
    key: 'colourScheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = () => {
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    Supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Auth Change --- ${event} --- ${session?.user?.email}`);

      if (event === 'SIGNED_OUT' && session === null) {
        FetchPost('/api/auth', { event, session }).then(() => Router.push('/'));
      }
      if (event === 'SIGNED_IN' && session !== null) {
        FetchPost('/api/auth', { event, session }).then(() =>
          Router.push('/dashboard')
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Kiss</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

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
    </>
  );
}
