import React from 'react';

import { BulletText } from '.';
import { BulletList } from '../bulletList';

function Template(args) {
  return (
    <BulletList>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <BulletText {...args} />
    </BulletList>
  );
}

export default {
  component: BulletText,
  title: 'Atoms/BulletText',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    text: "I'm a bullet",
  },
};

export const SimpleExample = {
  render: () => (
    <BulletList>
      <BulletText>Example bullet</BulletText>
    </BulletList>
  ),

  name: 'Simple example',
};
