import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { PaddingView } from '.';
import { PaddingSize } from '../../particles';
import { Box, Text } from '../../particles';
import { BackgroundView } from '../backgroundView';

const meta: Meta<typeof PaddingView> = {
  component: PaddingView,
  title: 'Wrappers/PaddingView',
};

export default meta;
type Story = StoryObj<typeof PaddingView>;

export const Default: Story = {
  render: (args) => (
    <BackgroundView color="lightblue">
      <PaddingView {...args}>
        <Box variant="card">
          <Text>Content with padding</Text>
        </Box>
      </PaddingView>
    </BackgroundView>
  ),
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <BackgroundView color="lightblue">
        <PaddingView padding={PaddingSize.Narrow}>
          <Box variant="card"><Text>Narrow</Text></Box>
        </PaddingView>
      </BackgroundView>
      <BackgroundView color="lightgreen">
        <PaddingView padding={PaddingSize.Default}>
          <Box variant="card"><Text>Default</Text></Box>
        </PaddingView>
      </BackgroundView>
      <BackgroundView color="lightyellow">
        <PaddingView padding={PaddingSize.Wide}>
          <Box variant="card"><Text>Wide</Text></Box>
        </PaddingView>
      </BackgroundView>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <BackgroundView color="lightblue">
      <PaddingView paddingHorizontal={PaddingSize.Wide}>
        <Box variant="card"><Text>Horizontal padding only</Text></Box>
      </PaddingView>
    </BackgroundView>
  ),
};

export const Vertical: Story = {
  render: () => (
    <BackgroundView color="lightblue">
      <PaddingView paddingVertical={PaddingSize.Wide}>
        <Box variant="card"><Text>Vertical padding only</Text></Box>
      </PaddingView>
    </BackgroundView>
  ),
};
