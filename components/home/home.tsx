import React from 'react';
import { Box, Center, Code, Divider, SimpleGrid, Text } from '@mantine/core';
import { ArrowBottomBar } from 'tabler-icons-react';
import { HomeHeader } from '../header/HomeHeader';
import Underline from '../Underline';
import { DashFooter } from '../footer/DashFooter';

const HomeComponent = () => (
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
<<<<<<< HEAD
                <a
                  style={{ color: 'inherit', textDecoration: 'none' }}
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.reuters.com/article/urnidgns002570f3005978d8002576f60035a6bb-idUS98192761820100330"
                >
                  https://www.reuters.com/article/urnidgns002570f3005978d8002576f60035a6bb-idUS98192761820100330
                </a>
=======
                https://www.reuters.com/article/urnidgns002570f3005978d8002576f60035a6bb-idUS98192761820100330
>>>>>>> cd11ec9e9766aba5c89399e50f074d728e54cea6
              </Code>

              <Box m="auto" mt="xs">
                <ArrowBottomBar size={18} />
              </Box>

<<<<<<< HEAD
              <Code m="auto">
                <a
                  style={{ color: 'inherit' }}
                  target="_blank"
                  rel="noreferrer"
                  href="https://k.cyclic.app/k/XJOIFBAYDC"
                >
                  https://k.cyclic.app/k/XJOIFBAYDC
                </a>
              </Code>
=======
              <Code m="auto">https://k.cyclic.app/k/XJOIFBAYDC</Code>
>>>>>>> cd11ec9e9766aba5c89399e50f074d728e54cea6
            </SimpleGrid>

            <Divider my="md" />

            <Text m="auto" size="sm" color="dimmed">
              And you can also use
              <Underline>Kiss</Underline>
              as a reverse proxy.
            </Text>

            <SimpleGrid spacing={5}>
<<<<<<< HEAD
              <Code m="auto">
                <a
                  style={{ color: 'inherit', textDecoration: 'none' }}
                  target="_blank"
                  rel="noreferrer"
                  href="https://mohitxskull.vercel.app/"
                >
                  https://mohitxskull.vercel.app/
                </a>
              </Code>
=======
              <Code m="auto">https://mohitxskull.vercel.app/</Code>
>>>>>>> cd11ec9e9766aba5c89399e50f074d728e54cea6

              <Box m="auto" mt="xs">
                <ArrowBottomBar size={18} />
              </Box>

<<<<<<< HEAD
              <Code m="auto">
                <a
                  style={{ color: 'inherit' }}
                  target="_blank"
                  rel="noreferrer"
                  href="https://k.cyclic.app/k/2NIIKVJ5Z3"
                >
                  https://k.cyclic.app/k/2NIIKVJ5Z3
                </a>
              </Code>
=======
              <Code m="auto">https://k.cyclic.app/k/2NIIKVJ5Z3</Code>
>>>>>>> cd11ec9e9766aba5c89399e50f074d728e54cea6
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
export default HomeComponent;
