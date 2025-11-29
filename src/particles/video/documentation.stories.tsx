import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Video } from '.';
import { Text } from '../text';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';

const meta: Meta<typeof Video> = {
  component: Video,
  title: 'Particles/Video',
};

export default meta;
type Story = StoryObj<typeof Video>;

const sampleVideo = 'https://everysize.evrpg.com/_bh20200903213922/assets/hero.mp4';

export const Default: Story = {
  args: {
    source: sampleVideo,
    alternativeText: 'Sample video',
  },
  render: (args) => <Video {...args} />,
};

export const NoControls: Story = {
  render: () => (
    <Video
      source={sampleVideo}
      alternativeText="Video without controls"
      shouldShowControls={false}
      shouldLoop={true}
      shouldMute={true}
      shouldAutoplay={true}
    />
  ),
};

export const Autoplay: Story = {
  render: () => (
    <Video
      source={sampleVideo}
      alternativeText="Autoplaying video"
      shouldAutoplay={true}
      shouldMute={true}
      shouldLoop={true}
    />
  ),
};

export const FixedSize: Story = {
  render: () => (
    <Video
      source={sampleVideo}
      alternativeText="Fixed size video"
      width="400px"
      height="300px"
      fitType="cover"
    />
  ),
};

export const WithCallbacks: Story = {
  render: function WithCallbacksStory() {
    const [status, setStatus] = React.useState('Ready');
    return (
      <Stack direction={Direction.Vertical} shouldAddGutters={true}>
        <Text>Status: {status}</Text>
        <Video
          source={sampleVideo}
          alternativeText="Video with callbacks"
          width="400px"
          onPlayed={() => setStatus('Playing')}
          onPaused={() => setStatus('Paused')}
          onEnded={() => setStatus('Ended')}
        />
      </Stack>
    );
  },
};
