import React from 'react';

import { AppDownloadButton } from '.';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <AppDownloadButton {...args} />;
}

export default {
  component: AppDownloadButton,
  title: 'Molecules/AppDownloadButton',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    isLazyLoadable: false,
    appType: 'android',
  },
};

export const AndroidDark = {
  render: () => (
    <AppDownloadButton
      isLazyLoadable={false}
      appType='android'
      buttonVariant='dark'
    />
  ),
  name: 'Android Dark',
};

export const IOsDark = {
  render: () => (
    <AppDownloadButton
      isLazyLoadable={false}
      appType='ios'
      buttonVariant='dark'
    />
  ),
  name: 'iOS Dark',
};

export const MacDark = {
  render: () => (
    <AppDownloadButton
      isLazyLoadable={false}
      appType='mac'
      buttonVariant='dark'
    />
  ),
  name: 'Mac Dark',
};

export const AppleTvDark = {
  render: () => (
    <AppDownloadButton
      isLazyLoadable={false}
      appType='appletv'
      buttonVariant='dark'
    />
  ),
  name: 'AppleTV Dark',
};

export const AndroidDarkClear = {
  render: () => (
    <AppDownloadButton
      isLazyLoadable={false}
      appType='android'
      buttonVariant='dark-clear'
    />
  ),
  name: 'Android Dark Clear',
};

export const AndroidLight = {
  render: () => (
    <AppDownloadButton
      isLazyLoadable={false}
      appType='android'
      buttonVariant='light'
    />
  ),
  name: 'Android Light',
};

export const AndroidLightClear = {
  render: () => (
    <AppDownloadButton
      isLazyLoadable={false}
      appType='android'
      buttonVariant='light-clear'
    />
  ),
  name: 'Android Light Clear',
};
