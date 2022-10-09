import React, { useState } from 'react';
import { Button, Card, SegmentedControl } from '@mantine/core';
import ModalHeader from '../header/ModalHeader';
import EmailSettings from './EmailChange';
import PassSettings from './PassSetting';
import { useDashboardContext } from '../../lib/context/Dashboard';

const SettingsCard = () => {
  const { SetDashboardState } = useDashboardContext();

  const [SettingsState, setSettingsState] = useState('email');

  return (
    <>
      <Card
        withBorder
        p="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        })}
      >
        <ModalHeader
          title="Settings"
          rightbtn={
            <Button
              onClick={() => SetDashboardState({ state: 'list' })}
              variant="white"
              compact
            >
              Home
            </Button>
          }
        />

        <SegmentedControl
          fullWidth
          value={SettingsState}
          onChange={setSettingsState}
          data={[
            { label: 'Email', value: 'email' },
            { label: 'Password', value: 'password' },
          ]}
        />

        {SettingsState === 'email' && <EmailSettings />}
        {SettingsState === 'password' && <PassSettings />}
      </Card>
    </>
  );
};

export default SettingsCard;
