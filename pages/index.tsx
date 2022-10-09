import React from 'react';
import { Box, SimpleGrid, Text } from '@mantine/core';
import { NextPage } from 'next';
import { NextLink } from '@mantine/next';
import { DashFooter } from '../components/footer/DashFooter';

const Index: NextPage = () => (
  <>
    <Box
      sx={() => ({
        height: '90vh',
      })}
      pt={70}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <SimpleGrid cols={1}>
            <Text
              sx={(theme) => ({
                fontFamily: 'DGE-B, sans-serif',
                fontSize: 145, // SmallerScreen ? 100 : 200,
                lineHeight: 0.7,
                color: theme.colors.grape[6],
              })}
            >
              Kiss
            </Text>

            <Text
              component={NextLink}
              href="/signin"
              align="center"
              sx={() => ({
                cursor: 'pointer',
                textDecoration: 'underline',
              })}
            >
              Signin
            </Text>
          </SimpleGrid>
        </div>
      </div>
    </Box>

    <DashFooter />
  </>
);
export default Index;
