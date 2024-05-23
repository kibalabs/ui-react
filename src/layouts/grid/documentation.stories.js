import React from 'react';

import { Grid } from '.';
import { PaddingSize } from '../..';
import { Box, KibaIcon, Text } from '../../particles';

export default {
  component: Grid,
  title: 'Layouts/Grid',
};

export const AllDifferentSizes = {
  render: () => (
    <Grid>
      <Grid.Item size={1}>
        <KibaIcon iconId={'ion-airplane'} />
      </Grid.Item>
      <Grid.Item size={2}>
        <KibaIcon iconId={'ion-american-football'} />
      </Grid.Item>
      <Grid.Item size={3}>
        <KibaIcon iconId={'ion-at'} />
      </Grid.Item>
      <Grid.Item size={4}>
        <KibaIcon iconId={'ion-albums'} />
      </Grid.Item>
      <Grid.Item size={5}>
        <KibaIcon iconId={'ion-bag'} />
      </Grid.Item>
      <Grid.Item size={6}>
        <KibaIcon iconId={'ion-bonfire'} />
      </Grid.Item>
    </Grid>
  ),

  name: 'All Different Sizes',
};

export const GutterApplied = {
  render: () => (
    <Grid shouldAddGutters={true}>
      <Grid.Item size={1}>
        <KibaIcon iconId={'ion-airplane'} />
      </Grid.Item>
      <Grid.Item size={1}>
        <KibaIcon iconId={'ion-american-football'} />
      </Grid.Item>
      <Grid.Item size={1}>
        <KibaIcon iconId={'ion-at'} />
      </Grid.Item>
      <Grid.Item size={1}>
        <KibaIcon iconId={'ion-albums'} />
      </Grid.Item>
      <Grid.Item size={1}>
        <KibaIcon iconId={'ion-bag'} />
      </Grid.Item>
      <Grid.Item size={1}>
        <KibaIcon iconId={'ion-bonfire'} />
      </Grid.Item>
    </Grid>
  ),

  name: 'Gutter applied',
};

export const DefaultGutters = {
  render: () => (
    <Box>
      <Text>Boxes seperated by default gutters</Text>
      <Grid shouldAddGutters={true}>
        <Grid.Item size={3}>
          <Box variant='card' isFullWidth={true} />
        </Grid.Item>
        <Grid.Item size={3}>
          <Box variant='card' isFullWidth={true} />
        </Grid.Item>
        <Grid.Item size={5}>
          <Box variant='card' isFullWidth={true} />
        </Grid.Item>
      </Grid>
    </Box>
  ),

  name: 'Default Gutters',
};

export const WideGutters = {
  render: () => (
    <Box>
      <Text>Boxes seperated by wide gutters</Text>
      <Grid shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
        <Grid.Item size={3}>
          <Box variant='card' isFullWidth={true} />
        </Grid.Item>
        <Grid.Item size={3}>
          <Box variant='card' isFullWidth={true} />
        </Grid.Item>
        <Grid.Item size={5}>
          <Box variant='card' isFullWidth={true} />
        </Grid.Item>
      </Grid>
    </Box>
  ),

  name: 'Wide Gutters',
};

export const NoGutters = {
  render: () => (
    <Box>
      <Text>Boxes seperated by no gutter</Text>
      <Grid shouldAddGutters={false}>
        <Grid.Item size={3}>
          <Box variant='card' isFullWidth={true} />
        </Grid.Item>
        <Grid.Item size={3}>
          <Box variant='card' isFullWidth={true} />
        </Grid.Item>
        <Grid.Item size={5}>
          <Box variant='card' isFullWidth={true} />
        </Grid.Item>
      </Grid>
    </Box>
  ),

  name: 'No Gutters',
};

export const ResponsiveGrid = {
  render: () => (
    <Box>
      <Text>Boxes that are Responsive</Text>
      <Grid shouldAddGutters={true}>
        <Grid.Item
          sizeResponsive={{
            base: 6,
            medium: 4,
          }}
        >
          <Box variant='card' isFullWidth={true} />
        </Grid.Item>
        <Grid.Item
          sizeResponsive={{
            base: 6,
            medium: 4,
          }}
        >
          <Box variant='card' isFullWidth={true} />
        </Grid.Item>
        <Grid.Item
          sizeResponsive={{
            base: 6,
            medium: 4,
          }}
        >
          <Box variant='card' isFullWidth={true} />
        </Grid.Item>
      </Grid>
    </Box>
  ),

  name: 'Responsive Grid',
};
