import React from 'react';

import { Stack } from '.';
import { Direction } from '../../model';
import { Box, KibaIcon } from '../../particles';
import { BackgroundView } from '../../wrappers';

function Template(args) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Stack {...args}>
      <KibaIcon iconId='ion-airplane' />
      <KibaIcon iconId='ion-american-football' />
      <KibaIcon iconId='ion-at' />
      <KibaIcon iconId='ion-albums' />
      <KibaIcon iconId='ion-bag' />
      <KibaIcon iconId='ion-bonfire' />
      <KibaIcon iconId='ion-battery-full' />
    </Stack>
  );
}

export default {
  component: Stack,
  title: 'Layouts/Stack',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};

export const Vertical = {
  render: () => (
    <Stack direction={Direction.Vertical}>
      <KibaIcon iconId='ion-accessibility' />
      <KibaIcon iconId='ion-american-football' />
      <KibaIcon iconId='ion-at' />
      <KibaIcon iconId='ion-albums' />
      <KibaIcon iconId='ion-bag' />
      <KibaIcon iconId='ion-bonfire' />
      <KibaIcon iconId='ion-battery-full' />
    </Stack>
  ),

  name: 'Vertical',
};

export const Spaced = {
  render: () => (
    <Stack direction={Direction.Horizontal}>
      <KibaIcon iconId='ion-accessibility' />
      <KibaIcon iconId='ion-american-football' />
      <Stack.Item growthFactor={1} shrinkFactor={1} />
      <KibaIcon iconId='ion-battery-full' />
    </Stack>
  ),

  name: 'Spaced',
};

export const WrappedItems = {
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

  name: 'Wrapped Items',
};

export const WrappedPills = {
  render: () => (
    <Stack
      direction={Direction.Horizontal}
      shouldWrapItems={true}
      isFullHeight={true}
    >
      <BackgroundView color='#afefef'>
        <Box width='300px' height='50px' />
      </BackgroundView>
      <BackgroundView color='#afefef'>
        <Box width='300px' height='50px' />
      </BackgroundView>
      <BackgroundView color='#afefef'>
        <Box width='300px' height='50px' />
      </BackgroundView>
      <BackgroundView color='#afefef'>
        <Box width='300px' height='50px' />
      </BackgroundView>
      <BackgroundView color='#afefef'>
        <Box width='300px' height='50px' />
      </BackgroundView>
      <BackgroundView color='#afefef'>
        <Box width='300px' height='50px' />
      </BackgroundView>
      <Box isFullWidth={true} />
    </Stack>
  ),

  name: 'Wrapped Pills',
};

export const ShrinkBelowSize = {
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

  name: 'Shrink below size',
};
