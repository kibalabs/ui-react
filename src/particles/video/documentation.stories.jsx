import React from 'react';

import { Video } from '.';
import { Text } from '../../particles';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Video {...args} />;
}

export default {
  component: Video,
  title: 'Particles/Video',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    source: 'https://everysize.evrpg.com/_bh20200903213922/assets/hero.mp4',
    isLazyLoadable: false,
  },
};

export const NoControls = {
  render: () => (
    <Video
      source='https://everysize.evrpg.com/_bh20200903213922/assets/hero.mp4'
      isLazyLoadable={false}
      shouldShowControls={false}
    />
  ),

  name: 'No Controls',
};

export const Autoplay = {
  render: () => (
    <Video
      source='https://everysize.evrpg.com/_bh20200903213922/assets/hero.mp4'
      isLazyLoadable={false}
      shouldAutoplay={true}
    />
  ),

  name: 'Autoplay',
};

export const LazyLoading = {
  render: () => (
    <Video
      source='https://everysize.evrpg.com/_bh20200903213922/assets/hero.mp4'
      isLazyLoadable={true}
      shouldAutoplay={true}
      shouldShowControls={false}
    />
  ),

  name: 'Lazy loading',
};

export function OnEnded() {
  const [isEnded, setIsEnded] = React.useState(false);
  const [isPlayed, setIsPlayed] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  const onEnded = () => {
    setIsEnded(true);
  };

  const onPlayed = () => {
    setIsPlayed(true);
  };

  const onPaused = () => {
    setIsPaused(true);
  };

  return (
    <div>
      <Text>{`isEnded: ${isEnded}`}</Text>
      <Text>{`isPlayed: ${isPlayed}`}</Text>
      <Text>{`isPaused: ${isPaused}`}</Text>
      <Video
        source='https://everysize.evrpg.com/_bh20200903213922/assets/hero.mp4'
        isLazyLoadable={false}
        shouldAutoplay={true}
        shouldLoop={false}
        onEnded={onEnded}
        onPlayed={onPlayed}
        onPaused={onPaused}
      />
    </div>
  );
}
