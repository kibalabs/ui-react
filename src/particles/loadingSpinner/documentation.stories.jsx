import React from 'react';

import { LoadingSpinner } from '.';
import { Box } from '../box';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <LoadingSpinner {...args} />;
}

export default {
  component: LoadingSpinner,
  title: 'Particles/LoadingSpinner',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};

export const Light = {
  render: () => <LoadingSpinner variant='light' />,
  name: 'Light',
};

export const Dark = {
  render: () => <LoadingSpinner variant='dark' />,
  name: 'Dark',
};

export const Small = {
  render: () => <LoadingSpinner variant='small' />,
  name: 'Small',
};

export const Large = {
  render: () => <LoadingSpinner variant='large' />,
  name: 'Large',
};

export const ExtraLarge = {
  render: () => <LoadingSpinner variant='extraLarge' />,
  name: 'Extra Large',
};

export const Fill = {
  render: () => (
    <Box height='200px' width='200px'>
      <LoadingSpinner variant='fill' />
    </Box>
  ),

  name: 'Fill',
};
