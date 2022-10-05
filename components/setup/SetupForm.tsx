import React, { useState } from 'react';
import { Box, Button, Modal, PasswordInput, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import ModalHeader from '../header/ModalHeader';
import { FetchPost } from '../../lib/helpers/FetchHelpers';
import CallNoti from '../../lib/helpers/NotiCaller';
import { APIResTypes } from '../../lib/types/world';
import Bcrypt from '../../lib/helpers/Bcrypt';
import { SetupInfoSchema } from '../../lib/schemas/group';

const SetupFormCom = () => {
  const [PriLoading, setPriLoading] = useState(false);
  const Router = useRouter();

  const SetupForm = useForm({
    initialValues: {
      Username: '',
      Password: '',
      ConfirmPassword: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
    validate: joiResolver(SetupInfoSchema),
  });

  return (
    <>
      <Modal opened onClose={() => {}} withCloseButton={false} centered>
        <Box sx={{ maxWidth: 390 }} mx="auto">
          <ModalHeader title="Setup" />
          <form
            onSubmit={SetupForm.onSubmit(async (values) => {
              setPriLoading(true);
              const ValuesCopy: { ConfirmPassword?: string; Password: string } =
                { ...values };
              delete ValuesCopy.ConfirmPassword;

              const Res = await FetchPost('/api/setup', {
                ...ValuesCopy,
                Password: Bcrypt.Hash(ValuesCopy.Password),
              });

              if (Res.ok) {
                CallNoti('Done', 'Setup completed!');
                Router.push('/');
              } else {
                const ErrorMsg: APIResTypes = await Res.json();
                CallNoti('Error', ErrorMsg.Error);
              }
              setPriLoading(false);
              SetupForm.reset();
            })}
          >
            <TextInput
              disabled={PriLoading}
              required
              label="Username"
              {...SetupForm.getInputProps('Username')}
            />
            <PasswordInput
              disabled={PriLoading}
              mt="xs"
              required
              label="Password"
              {...SetupForm.getInputProps('Password')}
            />
            <PasswordInput
              disabled={PriLoading}
              mt="xs"
              required
              label="Confirm password"
              error={'ConfirmPassword' in SetupForm.errors ? 'donot' : null}
              {...SetupForm.getInputProps('ConfirmPassword')}
            />

            <Button loading={PriLoading} type="submit" mt="md" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default SetupFormCom;
