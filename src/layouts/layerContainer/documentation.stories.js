import React from 'react';

import { LayerContainer } from '.';
import { Alignment } from '../../model';
import { Box } from '../../particles';
import { BackgroundView } from '../../wrappers';

export default {
  component: LayerContainer,
  title: 'Layouts/LayerContainer',
};

export const LayersOnTopOfEachOther = {
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

  name: 'Layers on top of each other',
};

export const LayersWithAStaticHeightLayer = {
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
          <BackgroundView color='limegreen'>
            <Box height='50px' width='50px' />
          </BackgroundView>
        </LayerContainer.Layer>
      </LayerContainer>
    </Box>
  ),

  name: 'Layers with a static height layer',
};

export const LayersOnTopOfEachOtherAndCentered = {
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

  name: 'Layers on top of each other and centered',
};

export const LayersOnTopOfEachOtherWithCustomAlignment = {
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
            <Box height='50px' width='50px' />
          </BackgroundView>
        </LayerContainer.Layer>
      </LayerContainer>
    </Box>
  ),

  name: 'Layers on top of each other with custom alignment',
};
