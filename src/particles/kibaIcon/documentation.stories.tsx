import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KibaIcon } from '.';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';
import { Text } from '../text';

const meta: Meta<typeof KibaIcon> = {
  component: KibaIcon,
  title: 'Particles/KibaIcon',
};

export default meta;
type Story = StoryObj<typeof KibaIcon>;

export const Default: Story = {
  args: {
    iconId: 'ion-cash',
  },
  render: (args) => <KibaIcon {...args} />,
};

export const IonIcons: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <KibaIcon iconId="ion-home" />
      <KibaIcon iconId="ion-settings" />
      <KibaIcon iconId="ion-person" />
      <KibaIcon iconId="ion-cash" />
    </Stack>
  ),
};

export const MaterialIcons: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <KibaIcon iconId="mui-home" />
      <KibaIcon iconId="mui-settings" />
      <KibaIcon iconId="mui-account-box" />
    </Stack>
  ),
};

export const FeatherIcons: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <KibaIcon iconId="feather-home" />
      <KibaIcon iconId="feather-settings" />
      <KibaIcon iconId="feather-airplay" />
    </Stack>
  ),
};

export const BootstrapIcons: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <KibaIcon iconId="bs-house" />
      <KibaIcon iconId="bs-gear" />
      <KibaIcon iconId="bs-basket2" />
    </Stack>
  ),
};

export const RemixIcons: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <KibaIcon iconId="remix-home-line" />
      <KibaIcon iconId="remix-settings-line" />
      <KibaIcon iconId="remix-honour" />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <Stack direction={Direction.Vertical}>
        <KibaIcon variant="small" iconId="ion-home" />
        <Text variant="note">small</Text>
      </Stack>
      <Stack direction={Direction.Vertical}>
        <KibaIcon iconId="ion-home" />
        <Text variant="note">default</Text>
      </Stack>
      <Stack direction={Direction.Vertical}>
        <KibaIcon variant="large" iconId="ion-home" />
        <Text variant="note">large</Text>
      </Stack>
      <Stack direction={Direction.Vertical}>
        <KibaIcon variant="extraLarge" iconId="ion-home" />
        <Text variant="note">extraLarge</Text>
      </Stack>
    </Stack>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <KibaIcon iconId="ion-heart" _color="#ff0000" />
      <KibaIcon iconId="ion-star" _color="#ffd700" />
      <KibaIcon iconId="ion-leaf" _color="#00aa00" />
    </Stack>
  ),
};
