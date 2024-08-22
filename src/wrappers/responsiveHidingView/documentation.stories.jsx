import React from 'react';

import { ResponsiveHidingView } from '.';
import { Box, Text } from '../../particles';

function Template(args) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ResponsiveHidingView {...args}>
      <Box variant='card'>
        <Text>I&apos;m wrapped</Text>
      </Box>
    </ResponsiveHidingView>
  );
}

export default {
  component: ResponsiveHidingView,
  title: 'Wrappers/ResponsiveHidingView',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};
