import React, { useState } from 'react';
import { Box, Button, Modal, PasswordInput, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { signIn } from 'next-auth/react';
import ModalHeader from '../header/ModalHeader';
import CallNoti from '../../lib/helpers/NotiCaller';
import { SetupInfoSchema } from '../../lib/schemas/group';

const SigninFormCom = () => {
  const [PriLoading, setPriLoading] = useState(false);

  const SiginForm = useForm({
    initialValues: {
      Username: '',
      Password: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
    validate: joiResolver(SetupInfoSchema),
  });

  return (
    <>
      <Modal opened onClose={() => {}} withCloseButton={false} centered>
        <Box sx={{ maxWidth: 390 }} mx="auto">
          <ModalHeader title="Sign in" />
          <form
            onSubmit={SiginForm.onSubmit(async (values) => {
              setPriLoading(true);

              const Res = await signIn('credentials', {
                username: values.Username,
                password: values.Password,
                redirect: false,
              });

              if (Res?.ok) {
                CallNoti('Done', 'Signed in!');
              } else {
                CallNoti('Error', Res?.error || 'Invalid creds');
              }
              setPriLoading(false);
              SiginForm.reset();
            })}
          >
            <TextInput
              withAsterisk={false}
              disabled={PriLoading}
              required
              label="Username"
              {...SiginForm.getInputProps('Username')}
            />
            <PasswordInput
              withAsterisk={false}
              disabled={PriLoading}
              mt="xs"
              required
              label="Password"
              {...SiginForm.getInputProps('Password')}
            />

            <Button loading={PriLoading} type="submit" mt="md" fullWidth>
              Sign in
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default SigninFormCom;
