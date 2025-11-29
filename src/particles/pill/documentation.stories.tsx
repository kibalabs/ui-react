import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Pill } from '.';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';
import { KibaIcon } from '../kibaIcon';

const meta: Meta<typeof Pill> = {
  component: Pill,
  title: 'Particles/Pill',
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Default: Story = {
  args: {
    text: 'Default Pill',
  },
  render: (args) => <Pill {...args} />,
};

export const Variants: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <Pill text='Default' />
      <Pill variant='primary' text='Primary' />
      <Pill variant='secondary' text='Secondary' />
      <Pill variant='success' text='Success' />
      <Pill variant='error' text='Error' />
    </Stack>
  ),
};

export const WithLeftIcon: Story = {
  render: () => (
    <Pill iconLeft={<KibaIcon iconId='ion-checkmark' />} text='Completed' variant='success' />
  ),
};

export const WithRightIcon: Story = {
  render: () => (
    <Pill iconRight={<KibaIcon iconId='ion-close' />} text='Remove' variant='error' />
  ),
};

export const Tags: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <Pill text='React' variant='primary' />
      <Pill text='TypeScript' variant='primary' />
      <Pill text='Storybook' variant='primary' />
    </Stack>
  ),
};

export const Status: Story = {
  render: () => (
    <Stack direction={Direction.Vertical} shouldAddGutters={true}>
      <Pill iconLeft={<KibaIcon iconId='ion-checkmark-circle' />} text='Payment successful' variant='success' />
      <Pill iconLeft={<KibaIcon iconId='ion-alert-circle' />} text='Action required' variant='error' />
      <Pill iconLeft={<KibaIcon iconId='ion-information-circle' />} text='Processing...' variant='primary' />
    </Stack>
  ),
};
