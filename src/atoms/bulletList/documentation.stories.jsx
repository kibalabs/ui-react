import React from 'react';

import { BulletList } from '.';
import { BulletText } from '../bulletText';

function Template(args) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BulletList {...args}>
      <BulletText>hello</BulletText>
      <BulletText>world</BulletText>
    </BulletList>
  );
}

export default {
  component: BulletList,
  title: 'Atoms/BulletList',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};

export const SimpleExample = {
  render: () => (
    <BulletList>
      <BulletText>hello</BulletText>
      <BulletText>world</BulletText>
    </BulletList>
  ),

  name: 'Simple example',
};
