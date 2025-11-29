import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ResponsiveContainingView } from '.';
import { Box, Text } from '../../particles';

const meta: Meta<typeof ResponsiveContainingView> = {
  component: ResponsiveContainingView,
  title: 'Wrappers/ResponsiveContainingView',
};

export default meta;
type Story = StoryObj<typeof ResponsiveContainingView>;

export const Default: Story = {
  render: (args) => (
    <ResponsiveContainingView {...args}>
      <Box variant='card'>
        <Box width='2000px'>
          <Text>Content contained responsively</Text>
        </Box>
      </Box>
    </ResponsiveContainingView>
  ),
  args: {
    size: 10,
  },
};

export const SmallSize: Story = {
  render: () => (
    <ResponsiveContainingView size={6}>
      <div style={{ backgroundColor: 'lightblue', padding: '1rem' }}>
        <Text>Contained to size 6</Text>
      </div>
    </ResponsiveContainingView>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <ResponsiveContainingView size={12}>
      <div style={{ backgroundColor: 'lightblue', padding: '1rem' }}>
        <Text>Contained to size 12 (full width)</Text>
      </div>
    </ResponsiveContainingView>
  ),
};
