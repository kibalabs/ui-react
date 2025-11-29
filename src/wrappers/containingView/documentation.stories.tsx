import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ContainingView } from '.';
import { Box, Text } from '../../particles';

const meta: Meta<typeof ContainingView> = {
  component: ContainingView,
  title: 'Wrappers/ContainingView',
};

export default meta;
type Story = StoryObj<typeof ContainingView>;

export const Default: Story = {
  render: (args) => (
    <ContainingView {...args}>
      <Box variant='card'>
        <Box width='2000px'>
          <Text>This content is wider than the container but contained</Text>
        </Box>
      </Box>
    </ContainingView>
  ),
  args: {},
};

export const WithMaxWidth: Story = {
  render: () => (
    <ContainingView>
      <div style={{ backgroundColor: 'lightblue', padding: '1rem' }}>
        <Text>Content is contained to a maximum width</Text>
      </div>
    </ContainingView>
  ),
};
