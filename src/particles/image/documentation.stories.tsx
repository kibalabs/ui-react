import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Image } from '.';
import { Box } from '../box';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';

const meta: Meta<typeof Image> = {
  component: Image,
  title: 'Particles/Image',
};

export default meta;
type Story = StoryObj<typeof Image>;

const sampleImage = 'https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg';

export const Default: Story = {
  args: {
    source: sampleImage,
    alternativeText: 'A gorilla in San Francisco Zoo',
    isLazyLoadable: false,
    maxWidth: '300px',
  },
  render: (args) => <Image {...args} />,
};

export const Circular: Story = {
  render: () => (
    <Image
      variant="circular"
      source={sampleImage}
      alternativeText="Profile image"
      width="150px"
      height="150px"
      fitType="cover"
      isLazyLoadable={false}
    />
  ),
};

export const Cover: Story = {
  render: () => (
    <Box width="300px" height="200px">
      <Image
        source={sampleImage}
        alternativeText="Cover fit image"
        isFullWidth={true}
        isFullHeight={true}
        fitType="cover"
        isLazyLoadable={false}
      />
    </Box>
  ),
};

export const Contain: Story = {
  render: () => (
    <Box variant="bordered" width="300px" height="200px">
      <Image
        source={sampleImage}
        alternativeText="Contain fit image"
        isFullWidth={true}
        isFullHeight={true}
        fitType="contain"
        isLazyLoadable={false}
      />
    </Box>
  ),
};

export const CenteredHorizontally: Story = {
  render: () => (
    <Box variant="bordered" width="400px">
      <Image
        source={sampleImage}
        alternativeText="Centered image"
        width="150px"
        height="150px"
        fitType="cover"
        isCenteredHorizontally={true}
        isLazyLoadable={false}
      />
    </Box>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal}>
      <Image
        source="https://d35ci2i0uce4j6.cloudfront.net/v1/images/87ea0e3413b84d9496e7ec7baee8468d/go"
        alternativeText="Responsive image"
        width="200px"
        height="200px"
        fitType="cover"
        isLazyLoadable={false}
      />
    </Stack>
  ),
};

export const Gallery: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal}>
      <Image
        variant="circular"
        source={sampleImage}
        alternativeText="Image 1"
        width="100px"
        height="100px"
        fitType="cover"
        isLazyLoadable={false}
      />
      <Image
        source={sampleImage}
        alternativeText="Image 2"
        width="100px"
        height="100px"
        fitType="cover"
        isLazyLoadable={false}
      />
      <Image
        variant="unrounded"
        source={sampleImage}
        alternativeText="Image 3"
        width="100px"
        height="100px"
        fitType="cover"
        isLazyLoadable={false}
      />
    </Stack>
  ),
};
