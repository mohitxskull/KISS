import React, { useState } from 'react';
import { Button, Divider, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Supabase } from '../../lib/client/supabase.pub';
import CallNoti from '../../lib/helpers/NotiCaller';

const EmailSettings = () => {
  const [PriLoading, setPriLoading] = useState(false);

  const UpdateEmailForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      newMail: '',
    },
    validate: {
      newMail: (value) =>
        /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? null
          : 'Invalid email',
    },
  });

  const HandleEmailUpdate = async (NEWEMAIL: string) => {
    setPriLoading(true);
    try {
      const { error } = await Supabase.auth.update({
        email: NEWEMAIL,
      });

      if (error) throw error;

      UpdateEmailForm.reset();
      CallNoti('Done', "Confirmation mail's has been sent!");
    } catch (error: any) {
      CallNoti('Error', error.error_description || error.message);
      console.error(error);
    }
    setPriLoading(false);
  };

  return (
    <>
      <Divider label="Current email" mb="md" mt="xl" />

      <TextInput value={Supabase.auth.user()?.email} readOnly />

      <Divider label="Update email" mb="md" mt="xl" />
      <form
        onSubmit={UpdateEmailForm.onSubmit((values) => {
          HandleEmailUpdate(values.newMail);
        })}
      >
        <TextInput
          disabled={PriLoading}
          description="An confirmation email will be sent to your current email address and your new one."
          placeholder="New Email address"
          required
          withAsterisk={false}
          {...UpdateEmailForm.getInputProps('newMail')}
        />

        <Button loading={PriLoading} type="submit" fullWidth mt="md">
          Send
        </Button>
      </form>
    </>
  );
};

export default EmailSettings;
