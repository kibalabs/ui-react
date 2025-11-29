import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Media } from '.';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';
import { Text } from '../text';

const meta: Meta<typeof Media> = {
  component: Media,
  title: 'Particles/Media',
};

export default meta;
type Story = StoryObj<typeof Media>;

const sampleImage = 'https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg';
const sampleVideo = 'https://everysize.evrpg.com/_bh20200903213922/assets/hero.mp4';

export const Default: Story = {
  args: {
    source: sampleImage,
    alternativeText: 'Sample media',
    maxWidth: '300px',
  },
  render: (args) => <Media {...args} />,
};

export const Image: Story = {
  render: () => (
    <Media
      source={sampleImage}
      alternativeText="Image media"
      width="300px"
      height="200px"
      fitType="cover"
    />
  ),
};

export const CircularImage: Story = {
  render: () => (
    <Media
      variant="circular"
      source={sampleImage}
      alternativeText="Circular image"
      width="150px"
      height="150px"
      fitType="cover"
    />
  ),
};

export const Video: Story = {
  render: () => (
    <Media
      source={sampleVideo}
      alternativeText="Video media"
      width="400px"
    />
  ),
};

export const AutoDetection: Story = {
  render: () => (
    <Stack direction={Direction.Vertical} shouldAddGutters={true}>
      <Text variant="bold">Image (auto-detected from .jpg extension):</Text>
      <Media source={sampleImage} alternativeText="Auto-detected image" maxWidth="200px" />
      <Text variant="bold">Video (auto-detected from .mp4 extension):</Text>
      <Media source={sampleVideo} alternativeText="Auto-detected video" width="300px" />
    </Stack>
  ),
};

export const Gallery: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <Media
        source={sampleImage}
        alternativeText="Gallery item 1"
        width="150px"
        height="150px"
        fitType="cover"
      />
      <Media
        variant="circular"
        source={sampleImage}
        alternativeText="Gallery item 2"
        width="150px"
        height="150px"
        fitType="cover"
      />
      <Media
        source={sampleImage}
        alternativeText="Gallery item 3"
        width="150px"
        height="150px"
        fitType="cover"
      />
    </Stack>
  ),
};
