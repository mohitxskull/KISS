import React from 'react';
import { Box, Center, Code, Divider, SimpleGrid, Text } from '@mantine/core';
import { NextPage } from 'next';
import { ArrowBottomBar } from 'tabler-icons-react';
import { DashFooter } from '../components/footer/DashFooter';
import Underline from '../components/Underline';
import { HomeHeader } from '../components/header/HomeHeader';

const Index: NextPage = () => (
  <>
    <div className="layout">
      <div className="row header">
        <HomeHeader />
      </div>
      <div className="row content">
        <Center mb={100}>
          <SimpleGrid
            cols={1}
            style={{ maxWidth: '250px', userSelect: 'none' }}
          >
            <Text
              align="center"
              sx={(theme) => ({
                fontFamily: 'DGE-B, sans-serif',
                fontSize: 145, // SmallerScreen ? 100 : 200,
                lineHeight: 0.7,
                color: theme.colors.grape[6],
              })}
            >
              Kiss
            </Text>

            <Text m="auto" size="sm" color="dimmed">
              On
              <Underline>Kiss</Underline>
              you can shorten your long url&apos;s.
            </Text>

            <SimpleGrid spacing={5}>
              <Code
                m="auto"
                style={{ maxWidth: '250px', wordBreak: 'break-all' }}
              >
                https://www.reuters.com/article/urnidgns002570f3005978d8002576f60035a6bb-idUS98192761820100330
              </Code>

              <Box m="auto" mt="xs">
                <ArrowBottomBar size={18} />
              </Box>

              <Code m="auto">https://k.cyclic.app/k/XJOIFBAYDC</Code>
            </SimpleGrid>

            <Divider my="md" />

            <Text m="auto" size="sm" color="dimmed">
              And you can also use
              <Underline>Kiss</Underline>
              as a reverse proxy.
            </Text>

            <SimpleGrid spacing={5}>
              <Code m="auto">https://mohitxskull.vercel.app/</Code>

              <Box m="auto" mt="xs">
                <ArrowBottomBar size={18} />
              </Box>

              <Code m="auto">https://k.cyclic.app/k/2NIIKVJ5Z3</Code>
            </SimpleGrid>
          </SimpleGrid>
        </Center>
      </div>
      <div className="row footer">
        <DashFooter />
      </div>
    </div>
  </>
);
export default Index;
