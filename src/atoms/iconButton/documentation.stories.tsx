import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from '.';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';
import { KibaIcon } from '../../particles';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'Atoms/IconButton',
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: <KibaIcon iconId='ion-settings' />,
  },
  render: (args) => <IconButton {...args} />,
};

export const Variants: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <IconButton icon={<KibaIcon iconId='ion-home' />} />
      <IconButton variant='primary' icon={<KibaIcon iconId='ion-home' />} />
      <IconButton variant='secondary' icon={<KibaIcon iconId='ion-home' />} />
      <IconButton variant='tertiary' icon={<KibaIcon iconId='ion-home' />} />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <IconButton variant='small' icon={<KibaIcon iconId='ion-add' />} />
      <IconButton icon={<KibaIcon iconId='ion-add' />} />
      <IconButton variant='large' icon={<KibaIcon iconId='ion-add' />} />
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <IconButton icon={<KibaIcon iconId='ion-trash' />} />
      <IconButton icon={<KibaIcon iconId='ion-trash' />} isEnabled={false} />
      <IconButton variant='primary' icon={<KibaIcon iconId='ion-trash' />} isEnabled={false} />
    </Stack>
  ),
};

export const Actions: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <IconButton icon={<KibaIcon iconId='ion-pencil' />} />
      <IconButton icon={<KibaIcon iconId='ion-trash' />} />
      <IconButton icon={<KibaIcon iconId='ion-share' />} />
      <IconButton icon={<KibaIcon iconId='ion-heart' />} />
    </Stack>
  ),
};

export const AsLink: Story = {
  render: () => (
    <IconButton
      icon={<KibaIcon iconId='ion-logo-github' />}
      target='https://github.com'
    />
  ),
};
