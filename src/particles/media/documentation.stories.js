import React from 'react';

import { Media } from '.';

const Template = (args) => <Media maxWidth='100%' {...args} />;

export default {
  component: Media,
  title: 'Particles/Media',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg',
    isLazyLoadable: false,
  },
};

export const Circular = {
  render: () => (
    <Media
      variant='circular'
      maxWidth='100%'
      source='https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg'
    />
  ),

  name: 'Circular',
};

export const Video = {
  render: () => (
    <Media source='https://everysize.evrpg.com/_bh20200903213922/assets/hero.mp4' />
  ),
  name: 'Video',
};

export const Relative = {
  render: () => <Media source='/sample.mp4' />,
  name: 'Relative',
};

export const VideoWithoutExtension = {
  render: () => (
    <Media source='https://pablo-images.kibalabs.com/v1/ipfs/QmZ3yCYX2c6Z2BNSTyx1zuBoPUJTB8dyE74zwngdweaFV6' />
  ),

  name: 'Video Without Extension',
};

export const ImageWithoutExtension = {
  render: () => (
    <Media source='https://lh3.googleusercontent.com/Xw_XUk3QoLH3i6ihkw_jIzj4a77nQfT_4BOw9FZ4ecvJ2L1Q5XwCy_6Oahw6xbuESg4cQxxh1HNPhTy-cm_APvw28zJhT8f_97zUJg' />
  ),

  name: 'Image Without Extension',
};

export const UnknownContentTypeWithoutExtension = {
  render: () => (
    <Media
      height={'500px'}
      source='https://genesisblocks.art/api/tokens/show/1539'
    />
  ),
  name: 'Unknown Content Type Without Extension',
};

export const ImageWithExtension = {
  render: () => (
    <Media
      height={'500px'}
      source='https://storage.googleapis.com/7981b604-d28c-4982-ac3f-0f9c61dc6e1d/3883.0001.png'
    />
  ),

  name: 'Image With Extension',
};
