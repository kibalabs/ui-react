import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { BackgroundView } from '.';
import { Box, Text } from '../../particles';

const meta: Meta<typeof BackgroundView> = {
  component: BackgroundView,
  title: 'Wrappers/BackgroundView',
};

export default meta;
type Story = StoryObj<typeof BackgroundView>;

export const Default: Story = {
  render: (args) => (
    <BackgroundView {...args}>
      <Box variant="card">
        <Text>Content with background</Text>
      </Box>
    </BackgroundView>
  ),
  args: {
    color: 'lightblue',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <BackgroundView color="lightblue">
        <Box height="50px" width="100px" />
      </BackgroundView>
      <BackgroundView color="lightgreen">
        <Box height="50px" width="100px" />
      </BackgroundView>
      <BackgroundView color="lightyellow">
        <Box height="50px" width="100px" />
      </BackgroundView>
    </div>
  ),
};

export const WithLinearGradient: Story = {
  render: () => (
    <BackgroundView linearGradient="45deg, #ff0000, #0000ff">
      <Box height="100px" width="200px" />
    </BackgroundView>
  ),
};
