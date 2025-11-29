import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { AppDownloadButton } from '.';

const meta: Meta<typeof AppDownloadButton> = {
  component: AppDownloadButton,
  title: 'Molecules/AppDownloadButton',
};

export default meta;
type Story = StoryObj<typeof AppDownloadButton>;

export const Default: Story = {
  args: {
    isLazyLoadable: false,
    appType: 'android',
  },
};

export const AppTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <AppDownloadButton isLazyLoadable={false} appType="android" buttonVariant="dark" />
      <AppDownloadButton isLazyLoadable={false} appType="ios" buttonVariant="dark" />
      <AppDownloadButton isLazyLoadable={false} appType="mac" buttonVariant="dark" />
      <AppDownloadButton isLazyLoadable={false} appType="appletv" buttonVariant="dark" />
    </div>
  ),
};

export const DarkVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <AppDownloadButton isLazyLoadable={false} appType="android" buttonVariant="dark" />
      <AppDownloadButton isLazyLoadable={false} appType="android" buttonVariant="dark-clear" />
    </div>
  ),
};

export const LightVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', backgroundColor: '#333', padding: '1rem' }}>
      <AppDownloadButton isLazyLoadable={false} appType="android" buttonVariant="light" />
      <AppDownloadButton isLazyLoadable={false} appType="android" buttonVariant="light-clear" />
    </div>
  ),
};

export const WithTarget: Story = {
  render: () => (
    <AppDownloadButton
      isLazyLoadable={false}
      appType="android"
      buttonVariant="dark"
      target="https://play.google.com/store"
    />
  ),
};
