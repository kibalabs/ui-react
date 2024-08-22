import React from 'react';

import { Spacing } from '.';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Spacing {...args} />;
}

export default {
  component: Spacing,
  title: 'Particles/Spacing',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};
