import React from 'react';

import { ResponsiveTextAlignmentView } from '.';
import { Box, Text } from '../../particles';

function Template(args) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ResponsiveTextAlignmentView {...args}>
      <Box variant='card'>
        <Text>I&apos;m wrapped</Text>
      </Box>
    </ResponsiveTextAlignmentView>
  );
}

export default {
  component: ResponsiveTextAlignmentView,
  title: 'Wrappers/ResponsiveTextAlignmentView',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};
