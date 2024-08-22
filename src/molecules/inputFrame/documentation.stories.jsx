import React from 'react';

import { InputFrame } from '.';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <InputFrame {...args} />;
}

export default {
  component: InputFrame,
  title: 'Molecules/InputFrame',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    placeholderText: 'What do you say?',
  },
};
