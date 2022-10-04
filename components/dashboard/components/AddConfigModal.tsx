import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Button, Group, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import ModalHeader from '../../header/ModalHeader';
import { HandleAddConfig } from '../../../lib/types/context';

const AddConfigModal = ({
  Opened,
  setClose,
  HandleAddConfigFun,
}: {
  Opened: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
  HandleAddConfigFun: HandleAddConfig;
}) => {
  const [PriLoading, setPriLoading] = useState(false);

  const AddConfigForm = useForm({
    initialValues: { name: '' },
    validateInputOnChange: true,
    validate: {
      name: (value) =>
        value.length < 1 || value.length > 20
          ? 'Cannot be empty and maximum length is 20'
          : null,
    },
  });

  return (
    <Modal
      opened={Opened}
      onClose={() => {
        setClose(false);
        AddConfigForm.reset();
      }}
      withCloseButton={false}
      centered
    >
      <Box sx={{ maxWidth: 390 }} mx="auto">
        <ModalHeader title="Add config" size={25} />
        <form
          onSubmit={AddConfigForm.onSubmit(async (values) => {
            setPriLoading(true);
            await HandleAddConfigFun(values.name, setClose);
            setPriLoading(false);
            AddConfigForm.reset();
          })}
        >
          <TextInput
            required
            withAsterisk={false}
            disabled={PriLoading}
            mt="md"
            placeholder="Config name"
            {...AddConfigForm.getInputProps('name')}
          />

          <Group mt="md" position="right">
            <Button
              disabled={PriLoading}
              onClick={() => {
                setClose(false);
                AddConfigForm.reset();
              }}
              variant="default"
            >
              Cancle
            </Button>
            <Button loading={PriLoading} type="submit" color="green">
              Add
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default AddConfigModal;
