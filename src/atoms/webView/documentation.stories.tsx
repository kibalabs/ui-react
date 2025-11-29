import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { WebView } from '.';

const meta: Meta<typeof WebView> = {
  component: WebView,
  title: 'Atoms/WebView',
};

export default meta;
type Story = StoryObj<typeof WebView>;

export const Default: Story = {
  render: (args) => (
    <div style={{ height: '300px' }}>
      <WebView {...args} />
    </div>
  ),
  args: {
    url: 'https://www.kibalabs.com',
  },
};

export const WithAspectRatio: Story = {
  render: () => (
    <WebView
      url="https://www.youtube.com/embed/_tUCouKc4Ek"
      aspectRatio={0.5625}
      title="YouTube Video"
    />
  ),
};

export const WithLazyLoading: Story = {
  render: () => (
    <div style={{ height: '300px' }}>
      <WebView
        url="https://www.kibalabs.com"
        isLazyLoadable={true}
      />
    </div>
  ),
};

export const NoLoadingSpinner: Story = {
  render: () => (
    <div style={{ height: '300px' }}>
      <WebView
        url="https://www.kibalabs.com"
        shouldShowLoadingSpinner={false}
      />
    </div>
  ),
};

export const WithCustomTitle: Story = {
  render: () => (
    <div style={{ height: '300px' }}>
      <WebView
        url="https://www.kibalabs.com"
        title="Kiba Labs Website"
      />
    </div>
  ),
};
