import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { EqualGrid } from '.';
import { Box, KibaIcon, Text } from '../../particles';

const meta: Meta<typeof EqualGrid> = {
  component: EqualGrid,
  title: 'Layouts/EqualGrid',
};

export default meta;
type Story = StoryObj<typeof EqualGrid>;

export const Default: Story = {
  render: (args) => (
    <EqualGrid {...args}>
      <KibaIcon iconId="ion-airplane" />
      <KibaIcon iconId="ion-american-football" />
      <KibaIcon iconId="ion-at" />
      <KibaIcon iconId="ion-albums" />
      <KibaIcon iconId="ion-bag" />
      <KibaIcon iconId="ion-bonfire" />
    </EqualGrid>
  ),
  args: {
    childSize: 3,
  },
};

export const TwoPerRow: Story = {
  render: () => (
    <EqualGrid childSize={6}>
      <Box variant="card"><Text>Item 1</Text></Box>
      <Box variant="card"><Text>Item 2</Text></Box>
      <Box variant="card"><Text>Item 3</Text></Box>
      <Box variant="card"><Text>Item 4</Text></Box>
    </EqualGrid>
  ),
};

export const FourPerRow: Story = {
  render: () => (
    <EqualGrid childSize={3}>
      <Box variant="card"><Text>1</Text></Box>
      <Box variant="card"><Text>2</Text></Box>
      <Box variant="card"><Text>3</Text></Box>
      <Box variant="card"><Text>4</Text></Box>
    </EqualGrid>
  ),
};

export const WithGutters: Story = {
  render: () => (
    <EqualGrid childSize={4} shouldAddGutters={true}>
      <Box variant="card"><Text>A</Text></Box>
      <Box variant="card"><Text>B</Text></Box>
      <Box variant="card"><Text>C</Text></Box>
    </EqualGrid>
  ),
};
