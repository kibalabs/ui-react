import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from '.';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';
import { Box } from '../box';
import { Text } from '../text';

const meta: Meta<typeof Divider> = {
  component: Divider,
  title: 'Particles/Divider',
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Stack direction={Direction.Vertical}>
      <Text>Content above</Text>
      <Divider {...args} />
      <Text>Content below</Text>
    </Stack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction={Direction.Vertical}>
      <Text>Section 1</Text>
      <Divider orientation='horizontal' />
      <Text>Section 2</Text>
      <Divider orientation='horizontal' />
      <Text>Section 3</Text>
    </Stack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Box height='100px'>
      <Stack direction={Direction.Horizontal} isFullHeight={true}>
        <Text>Left</Text>
        <Divider orientation='vertical' />
        <Text>Center</Text>
        <Divider orientation='vertical' />
        <Text>Right</Text>
      </Stack>
    </Box>
  ),
};

export const InCard: Story = {
  render: () => (
    <Box variant='card'>
      <Stack direction={Direction.Vertical}>
        <Text variant='header3'>Card Title</Text>
        <Divider />
        <Text>Card content goes here. The divider separates the header from the body.</Text>
      </Stack>
    </Box>
  ),
};
