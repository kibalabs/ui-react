import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from '.';
import { Box } from '../box';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';
import { Text } from '../text';

const meta: Meta<typeof LoadingSpinner> = {
  component: LoadingSpinner,
  title: 'Particles/LoadingSpinner',
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {
  args: {},
  render: (args) => <LoadingSpinner {...args} />,
};

export const Light: Story = {
  render: () => (
    <Box variant="padded" style={{ backgroundColor: '#333' }}>
      <LoadingSpinner variant="light" />
    </Box>
  ),
};

export const Dark: Story = {
  render: () => <LoadingSpinner variant="dark" />,
};

export const Sizes: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <Stack direction={Direction.Vertical}>
        <LoadingSpinner variant="small" />
        <Text variant="note">small</Text>
      </Stack>
      <Stack direction={Direction.Vertical}>
        <LoadingSpinner />
        <Text variant="note">default</Text>
      </Stack>
      <Stack direction={Direction.Vertical}>
        <LoadingSpinner variant="large" />
        <Text variant="note">large</Text>
      </Stack>
      <Stack direction={Direction.Vertical}>
        <LoadingSpinner variant="extraLarge" />
        <Text variant="note">extraLarge</Text>
      </Stack>
    </Stack>
  ),
};

export const Fill: Story = {
  render: () => (
    <Box variant="bordered" height="150px" width="150px">
      <LoadingSpinner variant="fill" />
    </Box>
  ),
};

export const InButton: Story = {
  render: () => (
    <Box variant="card" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <LoadingSpinner variant="small" />
      <Text>Loading...</Text>
    </Box>
  ),
};
