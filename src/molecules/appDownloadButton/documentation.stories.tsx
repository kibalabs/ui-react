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
    appId: 'com.example.app',
  },
};

export const AppTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <AppDownloadButton isLazyLoadable={false} appType='android' buttonVariant='dark' appId='com.example.app' />
      <AppDownloadButton isLazyLoadable={false} appType='ios' buttonVariant='dark' appId='123456789' />
      <AppDownloadButton isLazyLoadable={false} appType='mac' buttonVariant='dark' appId='123456789' />
      <AppDownloadButton isLazyLoadable={false} appType='appletv' buttonVariant='dark' appId='123456789' />
    </div>
  ),
};

export const DarkVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <AppDownloadButton isLazyLoadable={false} appType='android' buttonVariant='dark' appId='com.example.app' />
      <AppDownloadButton isLazyLoadable={false} appType='android' buttonVariant='dark-clear' appId='com.example.app' />
    </div>
  ),
};

export const LightVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', backgroundColor: '#333', padding: '1rem' }}>
      <AppDownloadButton isLazyLoadable={false} appType='android' buttonVariant='light' appId='com.example.app' />
      <AppDownloadButton isLazyLoadable={false} appType='android' buttonVariant='light-clear' appId='com.example.app' />
    </div>
  ),
};

export const WithAppId: Story = {
  render: () => (
    <AppDownloadButton
      isLazyLoadable={false}
      appType='android'
      buttonVariant='dark'
      appId='com.example.app'
    />
  ),
};
