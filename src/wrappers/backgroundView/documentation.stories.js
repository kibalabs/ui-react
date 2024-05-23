import React from 'react';

import { BackgroundView } from '.';
import { Box, Text } from '../../particles';

const Template = (args) => (
  <BackgroundView {...args}>
    <Box variant='card'>
      <Text>I&apos;m wrapped</Text>
    </Box>
  </BackgroundView>
);

export default {
  component: BackgroundView,
  title: 'Wrappers/BackgroundView',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    color: 'lightblue',
  },
};
