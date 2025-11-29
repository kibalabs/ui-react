import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ResponsiveHidingView } from '.';
import { ScreenSize } from '../../particles';
import { Box, Text } from '../../particles';

const meta: Meta<typeof ResponsiveHidingView> = {
  component: ResponsiveHidingView,
  title: 'Wrappers/ResponsiveHidingView',
};

export default meta;
type Story = StoryObj<typeof ResponsiveHidingView>;

export const Default: Story = {
  render: (args) => (
    <ResponsiveHidingView {...args}>
      <Box variant="card">
        <Text>Responsive visibility</Text>
      </Box>
    </ResponsiveHidingView>
  ),
  args: {},
};

export const HiddenOnSmall: Story = {
  render: () => (
    <ResponsiveHidingView hiddenBelow={ScreenSize.Medium}>
      <Box variant="card">
        <Text>Hidden on small screens</Text>
      </Box>
    </ResponsiveHidingView>
  ),
};

export const HiddenOnLarge: Story = {
  render: () => (
    <ResponsiveHidingView hiddenAbove={ScreenSize.Medium}>
      <Box variant="card">
        <Text>Hidden on large screens</Text>
      </Box>
    </ResponsiveHidingView>
  ),
};

export const MobileOnly: Story = {
  render: () => (
    <ResponsiveHidingView hiddenAbove={ScreenSize.Small}>
      <Box variant="card">
        <Text>Only visible on mobile</Text>
      </Box>
    </ResponsiveHidingView>
  ),
};

export const DesktopOnly: Story = {
  render: () => (
    <ResponsiveHidingView hiddenBelow={ScreenSize.Large}>
      <Box variant="card">
        <Text>Only visible on desktop</Text>
      </Box>
    </ResponsiveHidingView>
  ),
};
