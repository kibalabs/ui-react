import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Spacing } from '.';
import { Stack } from '../../layouts/stack';
import { Direction, MultiDirection } from '../../model';
import { Box } from '../box';
import { PaddingSize } from '../dimensions';
import { Text } from '../text';

const meta: Meta<typeof Spacing> = {
  component: Spacing,
  title: 'Particles/Spacing',
};

export default meta;
type Story = StoryObj<typeof Spacing>;

export const Default: Story = {
  args: {
    variant: PaddingSize.Default,
  },
  render: (args) => (
    <Stack direction={Direction.Vertical}>
      <Box variant='card'><Text>Item above spacing</Text></Box>
      <Spacing {...args} />
      <Box variant='card'><Text>Item below spacing</Text></Box>
    </Stack>
  ),
};

export const Narrow: Story = {
  render: () => (
    <Stack direction={Direction.Vertical}>
      <Box variant='card'><Text>Item 1</Text></Box>
      <Spacing variant={PaddingSize.Narrow2} />
      <Box variant='card'><Text>Item 2 (narrow spacing)</Text></Box>
    </Stack>
  ),
};

export const Wide: Story = {
  render: () => (
    <Stack direction={Direction.Vertical}>
      <Box variant='card'><Text>Item 1</Text></Box>
      <Spacing variant={PaddingSize.Wide2} />
      <Box variant='card'><Text>Item 2 (wide spacing)</Text></Box>
    </Stack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal}>
      <Box variant='card'><Text>Left</Text></Box>
      <Spacing variant={PaddingSize.Wide2} direction={MultiDirection.Horizontal} />
      <Box variant='card'><Text>Right</Text></Box>
    </Stack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Stack direction={Direction.Vertical}>
      <Box variant='card'><Text>Top</Text></Box>
      <Spacing variant={PaddingSize.Wide2} direction={MultiDirection.Vertical} />
      <Box variant='card'><Text>Bottom</Text></Box>
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack direction={Direction.Vertical}>
      <Text variant='bold'>None</Text>
      <Box variant='bordered'><Spacing variant={PaddingSize.None} /></Box>
      <Text variant='bold'>Narrow2</Text>
      <Box variant='bordered'><Spacing variant={PaddingSize.Narrow2} /></Box>
      <Text variant='bold'>Narrow1</Text>
      <Box variant='bordered'><Spacing variant={PaddingSize.Narrow1} /></Box>
      <Text variant='bold'>Default</Text>
      <Box variant='bordered'><Spacing variant={PaddingSize.Default} /></Box>
      <Text variant='bold'>Wide1</Text>
      <Box variant='bordered'><Spacing variant={PaddingSize.Wide1} /></Box>
      <Text variant='bold'>Wide2</Text>
      <Box variant='bordered'><Spacing variant={PaddingSize.Wide2} /></Box>
      <Text variant='bold'>Wide3</Text>
      <Box variant='bordered'><Spacing variant={PaddingSize.Wide3} /></Box>
    </Stack>
  ),
};
