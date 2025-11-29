import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { LayerContainer } from '.';
import { Alignment } from '../../model';
import { Box, Text } from '../../particles';
import { BackgroundView } from '../../wrappers';

const meta: Meta<typeof LayerContainer> = {
  component: LayerContainer,
  title: 'Layouts/LayerContainer',
};

export default meta;
type Story = StoryObj<typeof LayerContainer>;

export const Default: Story = {
  render: () => (
    <Box height='100px' width='100px'>
      <LayerContainer>
        <BackgroundView color='lightblue'>
          <Box height='100px' width='100px' />
        </BackgroundView>
        <BackgroundView color='limegreen'>
          <Box height='50px' width='50px' />
        </BackgroundView>
      </LayerContainer>
    </Box>
  ),
};

export const Centered: Story = {
  render: () => (
    <Box height='100px' width='100px'>
      <LayerContainer>
        <BackgroundView color='lightblue'>
          <Box height='100px' width='100px' />
        </BackgroundView>
        <LayerContainer.Layer
          isFullHeight={false}
          isFullWidth={false}
          alignmentVertical={Alignment.Center}
          alignmentHorizontal={Alignment.Center}
        >
          <BackgroundView color='limegreen'>
            <Box height='50px' width='50px' />
          </BackgroundView>
        </LayerContainer.Layer>
      </LayerContainer>
    </Box>
  ),
};

export const CustomAlignment: Story = {
  render: () => (
    <Box height='100px' width='100px'>
      <LayerContainer>
        <BackgroundView color='lightblue'>
          <Box height='100px' width='100px' />
        </BackgroundView>
        <LayerContainer.Layer
          isFullHeight={false}
          isFullWidth={false}
          alignmentVertical={Alignment.Start}
          alignmentHorizontal={Alignment.End}
        >
          <BackgroundView color='limegreen'>
            <Box height='30px' width='30px' />
          </BackgroundView>
        </LayerContainer.Layer>
      </LayerContainer>
    </Box>
  ),
};

export const StaticLayer: Story = {
  render: () => (
    <Box width='250px'>
      <LayerContainer>
        <LayerContainer.Layer isStatic={true}>
          <BackgroundView color='lightblue'>
            <Box height='150px' isFullWidth={true} />
          </BackgroundView>
        </LayerContainer.Layer>
        <LayerContainer.Layer
          isFullHeight={false}
          isFullWidth={false}
          alignmentVertical={Alignment.Center}
          alignmentHorizontal={Alignment.Center}
        >
          <Box variant='card'>
            <Text>Overlay</Text>
          </Box>
        </LayerContainer.Layer>
      </LayerContainer>
    </Box>
  ),
};
