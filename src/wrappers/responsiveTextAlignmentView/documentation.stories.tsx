import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ResponsiveTextAlignmentView } from '.';
import { TextAlignment } from '../../particles/text';
import { Box, Text } from '../../particles';

const meta: Meta<typeof ResponsiveTextAlignmentView> = {
  component: ResponsiveTextAlignmentView,
  title: 'Wrappers/ResponsiveTextAlignmentView',
};

export default meta;
type Story = StoryObj<typeof ResponsiveTextAlignmentView>;

export const Default: Story = {
  render: (args) => (
    <ResponsiveTextAlignmentView {...args}>
      <Box variant="card">
        <Text>Text with responsive alignment</Text>
      </Box>
    </ResponsiveTextAlignmentView>
  ),
  args: {},
};

export const CenterOnMobile: Story = {
  render: () => (
    <ResponsiveTextAlignmentView alignment={TextAlignment.Center} alignmentResponsive={{ medium: TextAlignment.Left }}>
      <Text>Centered on mobile, left-aligned on larger screens</Text>
    </ResponsiveTextAlignmentView>
  ),
};

export const RightOnDesktop: Story = {
  render: () => (
    <ResponsiveTextAlignmentView alignment={TextAlignment.Left} alignmentResponsive={{ large: TextAlignment.Right }}>
      <Text>Left-aligned by default, right-aligned on desktop</Text>
    </ResponsiveTextAlignmentView>
  ),
};
