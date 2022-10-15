import {
  Anchor,
  Box,
  Button,
  Global,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import Link from 'next/link';
import { Supabase } from '../../lib/client/supabase.pub';
import CallNoti from '../../lib/helpers/NotiCaller';
import { SignSchema } from '../../lib/schemas/group';
import ModalHeader from '../header/ModalHeader';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await Supabase.auth.api.getUserByCookie(req);

  if (user) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const SignInComponent = () => {
  const [PrivateLoading, setPrivateLoading] = useState(false);

  const HandleSignIn = async (EMAIL: string, PASSWORD: string) => {
    try {
      setPrivateLoading(true);
      const { error } = await Supabase.auth.signIn({
        email: EMAIL,
        password: PASSWORD,
      });
      if (error) throw error;
    } catch (error: any) {
      CallNoti('Error', error.error_description || error.message);
      setPrivateLoading(false);
    }
  };

  const SignInForm = useForm({
    validateInputOnChange: true,
    validate: joiResolver(SignSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <Global
        styles={() => ({
          body: {
            overflow: 'hidden',
          },
        })}
      />
      <Modal opened onClose={() => {}} withCloseButton={false} centered>
        <Box sx={{ maxWidth: 390 }} mx="auto">
          <ModalHeader title="Sign in" />
          <form
            onSubmit={SignInForm.onSubmit((values) =>
              HandleSignIn(values.email.trim(), values.password.trim())
            )}
          >
            <TextInput
              withAsterisk={false}
              disabled={PrivateLoading}
              variant="default"
              label="Email"
              placeholder="Your email"
              required
              {...SignInForm.getInputProps('email')}
            />
            <PasswordInput
              withAsterisk={false}
              disabled={PrivateLoading}
              label="Password"
              variant="default"
              placeholder="Your password"
              {...SignInForm.getInputProps('password')}
              required
              mt="md"
            />

            <Button
              type="submit"
              loading={PrivateLoading}
              variant="outline"
              fullWidth
              mt="xl"
            >
              Sign in
            </Button>
          </form>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text color="dimmed" size="sm" align="left" mt="lg">
              <Link href="/signup" passHref>
                <Anchor component="a" size="sm">
                  Register
                </Anchor>
              </Link>{' '}
              a new account
            </Text>
            <Text color="dimmed" size="sm" align="left" mt="lg">
              <Link href="/" passHref>
                <Anchor component="a" size="sm">
                  Home
                </Anchor>
              </Link>
            </Text>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SignInComponent;
