import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';
import { KibaIcon } from '../../particles';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Atoms/Button',
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: 'Default Button',
  },
  render: (args) => <Button {...args} />,
};

export const Variants: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <Button text="Default" />
      <Button variant="primary" text="Primary" />
      <Button variant="secondary" text="Secondary" />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <Button variant="small" text="Small" />
      <Button text="Default" />
      <Button variant="large" text="Large" />
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Stack direction={Direction.Vertical} shouldAddGutters={true}>
      <Button iconLeft={<KibaIcon iconId="ion-arrow-back" />} text="Back" />
      <Button iconRight={<KibaIcon iconId="ion-arrow-forward" />} text="Next" />
      <Button iconLeft={<KibaIcon iconId="ion-download" />} iconRight={<KibaIcon iconId="ion-checkmark" />} text="Download" />
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <Button text="Enabled" />
      <Button text="Disabled" isEnabled={false} />
      <Button text="Loading" isLoading={true} variant="primary" />
    </Stack>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Button
      text="Full Width Button"
      iconLeft={<KibaIcon iconId="ion-mail" />}
      isFullWidth={true}
      variant="primary"
    />
  ),
};

export const AsLink: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <Button text="External Link" target="https://kibalabs.com" />
      <Button text="Same Tab" target="https://kibalabs.com" targetShouldOpenSameTab={true} />
    </Stack>
  ),
};

export const Card: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <Button variant="card" text="Card Button" />
      <Button variant="card-primary" text="Card Primary" />
    </Stack>
  ),
};
