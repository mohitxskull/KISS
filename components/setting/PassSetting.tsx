import { Button, Divider, PasswordInput, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { MinPassLength } from '../../lib/consts';
import { FetchPost } from '../../lib/helpers/FetchHelpers';
import CallNoti from '../../lib/helpers/NotiCaller';
import Password from '../../lib/helpers/PasswordFuns';
import { APIResTypes, ChangePassTypes } from '../../lib/types/world';

const PassSettings = () => {
  const [PriLoading, setPriLoading] = useState(false);

  const UpdatePassForm = useForm<ChangePassTypes>({
    initialValues: {
      oldPass: '',
      newPass: '',
      confirmNewPass: '',
    },
    validate: {
      oldPass: (value) =>
        value.length < MinPassLength
          ? `"Old password" length must be at least ${MinPassLength} characters long`
          : null,
      newPass: (value) =>
        value.length < MinPassLength
          ? `"New password" length must be at least ${MinPassLength} characters long`
          : null,
      confirmNewPass: (value, values) =>
        value !== values.newPass ? 'Passwords did not match' : null,
    },
    validateInputOnChange: true,
  });

  const HandlePassUpdate = async (INPUT: ChangePassTypes) => {
    setPriLoading(true);
    const Res = await FetchPost('/api/auth/updatepass', INPUT);

    const ResBody: APIResTypes = await Res.json();

    if (Res.ok) {
      CallNoti('Done', 'Password has been updated');
      UpdatePassForm.reset();
    } else {
      CallNoti('Error', ResBody.Error);
    }
    setPriLoading(false);
  };

  return (
    <>
      <Divider label="Update password" mb="md" mt="xl" />
      <form
        onSubmit={UpdatePassForm.onSubmit((values) => {
          HandlePassUpdate(values);
        })}
      >
        <SimpleGrid>
          <PasswordInput
            // description="If you don't remember your old password click on forgot password an reset link on your email."
            placeholder="Current password"
            required
            withAsterisk={false}
            {...UpdatePassForm.getInputProps('oldPass')}
          />

          <PasswordInput
            withAsterisk={false}
            disabled={PriLoading}
            placeholder="New password"
            styles={() => ({
              input: { userSelect: 'auto' },
              description: {
                color:
                  UpdatePassForm.values.newPass.length > 0
                    ? Password.Strength(UpdatePassForm.values.newPass).color
                    : 'gray',
              },
            })}
            description={
              UpdatePassForm.values.newPass.length > 0
                ? Password.Strength(UpdatePassForm.values.newPass).des
                : null
            }
            {...UpdatePassForm.getInputProps('newPass')}
            required
          />

          <PasswordInput
            placeholder="Confirm new password"
            required
            withAsterisk={false}
            {...UpdatePassForm.getInputProps('confirmNewPass')}
          />
        </SimpleGrid>

        <Button type="submit" fullWidth mt="md">
          Update
        </Button>
      </form>
    </>
  );
};

export default PassSettings;
