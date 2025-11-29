import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '.';
import { Direction } from '../../model';
import { Box, KibaIcon } from '../../particles';
import { BackgroundView } from '../../wrappers';

const meta: Meta<typeof Stack> = {
  component: Stack,
  title: 'Layouts/Stack',
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  render: (args) => (
    <Stack {...args}>
      <KibaIcon iconId='ion-airplane' />
      <KibaIcon iconId='ion-american-football' />
      <KibaIcon iconId='ion-at' />
      <KibaIcon iconId='ion-albums' />
    </Stack>
  ),
  args: {},
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal}>
      <KibaIcon iconId='ion-airplane' />
      <KibaIcon iconId='ion-american-football' />
      <KibaIcon iconId='ion-at' />
    </Stack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Stack direction={Direction.Vertical}>
      <KibaIcon iconId='ion-airplane' />
      <KibaIcon iconId='ion-american-football' />
      <KibaIcon iconId='ion-at' />
    </Stack>
  ),
};

export const WithGutter: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <Box variant='card'><KibaIcon iconId='ion-airplane' /></Box>
      <Box variant='card'><KibaIcon iconId='ion-american-football' /></Box>
      <Box variant='card'><KibaIcon iconId='ion-at' /></Box>
    </Stack>
  ),
};

export const Spaced: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal}>
      <KibaIcon iconId='ion-accessibility' />
      <Stack.Item growthFactor={1} shrinkFactor={1} />
      <KibaIcon iconId='ion-battery-full' />
    </Stack>
  ),
};

export const WrappedItems: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldWrapItems={true}>
      <BackgroundView color='#afefef'>
        <Box width='300px' height='50px' />
      </BackgroundView>
      <BackgroundView color='#dfdfef'>
        <Box width='400px' height='50px' />
      </BackgroundView>
      <BackgroundView color='#afdfed'>
        <Box width='500px' height='50px' />
      </BackgroundView>
    </Stack>
  ),
};

export const ShrinkBelowSize: Story = {
  render: () => (
    <Box height='100px'>
      <Stack direction={Direction.Vertical} isFullHeight={true}>
        <BackgroundView color='#afefef'>
          <Box height='50px' />
        </BackgroundView>
        <Stack.Item shrinkFactor={1} shouldShrinkBelowContentSize={true}>
          <BackgroundView color='#f5a5b5'>
            <Box isScrollableVertically={true}>
              <Box height='500px' />
            </Box>
          </BackgroundView>
        </Stack.Item>
      </Stack>
    </Box>
  ),
};
