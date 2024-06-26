import React from 'react';

import { Spacing } from '.';

const Template = (args) => <Spacing {...args} />;

export default {
  component: Spacing,
  title: 'Particles/Spacing',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};
