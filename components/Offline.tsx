import { Table, Text } from '@mantine/core';
import { useNetwork } from '@mantine/hooks';
import React from 'react';

const OfflineCom = () => {
  const NetworkStatus = useNetwork();

  return (
    <Table sx={{ maxWidth: 300, tableLayout: 'fixed' }} mx="auto">
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Online</td>
          <td>
            <Text size="sm" color={NetworkStatus.online ? 'teal' : 'red'}>
              {NetworkStatus.online ? 'Online' : 'Offline'}
            </Text>
          </td>
        </tr>

        <tr>
          <td>rtt</td>
          <td>{NetworkStatus.rtt}</td>
        </tr>

        <tr>
          <td>downlink</td>
          <td>{NetworkStatus.downlink}</td>
        </tr>

        <tr>
          <td>effectiveType</td>
          <td>{NetworkStatus.effectiveType}</td>
        </tr>

        <tr>
          <td>saveData</td>
          <td>
            <Text size="sm" color={NetworkStatus.saveData ? 'teal' : 'red'}>
              {NetworkStatus.saveData ? 'true' : 'false'}
            </Text>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default OfflineCom;
