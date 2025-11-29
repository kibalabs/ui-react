import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ColorSettingView } from '.';
import { Box, Text } from '../../particles';

const meta: Meta<typeof ColorSettingView> = {
  component: ColorSettingView,
  title: 'Wrappers/ColorSettingView',
};

export default meta;
type Story = StoryObj<typeof ColorSettingView>;

export const Default: Story = {
  render: (args) => (
    <ColorSettingView {...args}>
      <Box variant="card">
        <Text>Text with custom color</Text>
      </Box>
    </ColorSettingView>
  ),
  args: {
    theme: {
      text: 'orange',
    },
  },
};

export const BrandColors: Story = {
  render: () => (
    <ColorSettingView theme={{ text: 'purple' }}>
      <Text>This text is purple</Text>
    </ColorSettingView>
  ),
};

export const MultipleSettings: Story = {
  render: () => (
    <ColorSettingView theme={{ text: 'blue', 'brand-primary': 'green' }}>
      <Box variant="card">
        <Text>Custom themed content</Text>
      </Box>
    </ColorSettingView>
  ),
};
