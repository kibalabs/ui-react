import React from 'react';

import { HidingView } from '.';
import { Box, Text } from '../../particles';

function Template(args) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <HidingView {...args}>
      <Box variant='card'>
        <Text>I&apos;m wrapped</Text>
      </Box>
    </HidingView>
  );
}

export default {
  component: HidingView,
  title: 'Wrappers/HidingView',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};
