import React from 'react';

import { BackgroundView } from '.';
import { Box, Text } from '../../particles';

function Template(args) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BackgroundView {...args}>
      <Box variant='card'>
        <Text>I&apos;m wrapped</Text>
      </Box>
    </BackgroundView>
  );
}

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
