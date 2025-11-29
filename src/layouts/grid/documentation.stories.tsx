import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from '.';
import { PaddingSize } from '../../';
import { Box, KibaIcon, Text } from '../../particles';

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: 'Layouts/Grid',
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  render: () => (
    <Grid>
      <Grid.Item size={4}>
        <Box variant="card"><Text>Size 4</Text></Box>
      </Grid.Item>
      <Grid.Item size={4}>
        <Box variant="card"><Text>Size 4</Text></Box>
      </Grid.Item>
      <Grid.Item size={4}>
        <Box variant="card"><Text>Size 4</Text></Box>
      </Grid.Item>
    </Grid>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <Grid>
      <Grid.Item size={1}><KibaIcon iconId="ion-airplane" /></Grid.Item>
      <Grid.Item size={2}><KibaIcon iconId="ion-american-football" /></Grid.Item>
      <Grid.Item size={3}><KibaIcon iconId="ion-at" /></Grid.Item>
      <Grid.Item size={4}><KibaIcon iconId="ion-albums" /></Grid.Item>
      <Grid.Item size={2}><KibaIcon iconId="ion-bag" /></Grid.Item>
    </Grid>
  ),
};

export const WithGutters: Story = {
  render: () => (
    <Grid shouldAddGutters={true}>
      <Grid.Item size={4}><Box variant="card" isFullWidth={true} /></Grid.Item>
      <Grid.Item size={4}><Box variant="card" isFullWidth={true} /></Grid.Item>
      <Grid.Item size={4}><Box variant="card" isFullWidth={true} /></Grid.Item>
    </Grid>
  ),
};

export const WideGutters: Story = {
  render: () => (
    <Grid shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
      <Grid.Item size={4}><Box variant="card" isFullWidth={true} /></Grid.Item>
      <Grid.Item size={4}><Box variant="card" isFullWidth={true} /></Grid.Item>
      <Grid.Item size={4}><Box variant="card" isFullWidth={true} /></Grid.Item>
    </Grid>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Grid shouldAddGutters={true}>
      <Grid.Item sizeResponsive={{ base: 12, medium: 6, large: 4 }}>
        <Box variant="card" isFullWidth={true}><Text>Responsive 1</Text></Box>
      </Grid.Item>
      <Grid.Item sizeResponsive={{ base: 12, medium: 6, large: 4 }}>
        <Box variant="card" isFullWidth={true}><Text>Responsive 2</Text></Box>
      </Grid.Item>
      <Grid.Item sizeResponsive={{ base: 12, medium: 12, large: 4 }}>
        <Box variant="card" isFullWidth={true}><Text>Responsive 3</Text></Box>
      </Grid.Item>
    </Grid>
  ),
};
