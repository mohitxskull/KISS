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
import { useForm } from '@mantine/form';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Link from 'next/link';
import { Supabase } from '../../lib/client/supabase.pub';
import { FetchPost } from '../../lib/helpers/FetchHelpers';
import CallNoti from '../../lib/helpers/NotiCaller';
import Password from '../../lib/helpers/PasswordFuns';
import { MinPassLength } from '../../lib/consts';
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

const SignUpComponent = () => {
  const [PrivateLoading, setPrivateLoading] = useState(false);

  const Router = useRouter();

  const HandleSignUp = async (EMAIL: string, PASSWORD: string) => {
    try {
      setPrivateLoading(true);
      const Response = await FetchPost('/api/auth/signup', {
        email: EMAIL,
        password: PASSWORD,
      });

      if (Response.status !== 301) {
        const data = await Response.json();
        console.log(data, 'Redirect => ', Response.redirected, Response.status);
        if (data.Error) throw data.Error;

        if (Response.ok) {
          Router.push('/signin');
        }

        CallNoti('Done', data.Data);
      }
    } catch (error: any) {
      if (typeof error === 'string') {
        CallNoti('Error', error);
      } else {
        console.info(error);
        CallNoti('Critical', error.issues[0].message || 'Report to dev!');
      }
    } finally {
      setPrivateLoading(false);
    }
  };

  const SignUpForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      Email: '',
      Password: '',
      ConfirmPassword: '',
    },

    validate: {
      Email: (value) =>
        /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? null
          : 'Invalid email',
      Password: (value) =>
        value.length < MinPassLength
          ? `"Password" length must be at least ${MinPassLength} characters long`
          : null,
      ConfirmPassword: (value, values) =>
        value !== values.Password ? 'Passwords did not match' : null,
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
          <ModalHeader title="Sign up" />
          <form
            onSubmit={SignUpForm.onSubmit((values) =>
              HandleSignUp(values.Email.trim(), values.Password.trim())
            )}
          >
            <TextInput
              withAsterisk={false}
              disabled={PrivateLoading}
              variant="default"
              label="Email"
              placeholder="Your email"
              required
              {...SignUpForm.getInputProps('Email')}
            />
            <PasswordInput
              withAsterisk={false}
              disabled={PrivateLoading}
              variant="default"
              label="Password"
              placeholder="Your password"
              styles={() => ({
                input: { userSelect: 'auto' },
                description: {
                  color:
                    SignUpForm.values.Password.length > 0
                      ? Password.Strength(SignUpForm.values.Password).color
                      : 'gray',
                },
              })}
              description={
                SignUpForm.values.Password.length > 0
                  ? Password.Strength(SignUpForm.values.Password).des
                  : ''
              }
              {...SignUpForm.getInputProps('Password')}
              required
              mt="md"
            />
            <PasswordInput
              withAsterisk={false}
              required
              variant="default"
              disabled={PrivateLoading}
              mt="md"
              label="Confirm password"
              placeholder="Confirm your password"
              {...SignUpForm.getInputProps('ConfirmPassword')}
            />
            <Button
              type="submit"
              loading={PrivateLoading}
              variant="outline"
              fullWidth
              mt="xl"
            >
              Sign up
            </Button>
          </form>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text color="dimmed" size="sm" align="left" mt="lg">
              Have an account?
              <Link href="/signin" passHref>
                <Anchor component="a" size="sm">
                  {' '}
                  Sign in
                </Anchor>
              </Link>
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

export default SignUpComponent;
