import React from 'react';

import { Image } from '.';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Image maxWidth='100%' isFullHeigh={true} {...args} />;
}

export default {
  component: Image,
  title: 'Particles/Image',
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
    <Image
      variant='circular'
      maxWidth='100%'
      isFullHeigh={true}
      source='https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg'
      isLazyLoadable={false}
    />
  ),

  name: 'Circular',
};

export const Responsive = {
  render: () => (
    <Image
      source='https://d35ci2i0uce4j6.cloudfront.net/v1/images/87ea0e3413b84d9496e7ec7baee8468d/go'
      isLazyLoadable={false}
      width='150px'
      height='150px'
    />
  ),

  name: 'Responsive',
};
