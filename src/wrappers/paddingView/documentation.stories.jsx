import React from 'react';

import { PaddingView } from '.';
import { Box, Text } from '../../particles';

function Template(args) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <PaddingView {...args}>
      <Box variant='card'>
        <Text>I&apos;m wrapped</Text>
      </Box>
    </PaddingView>
  );
}

export default {
  component: PaddingView,
  title: 'Wrappers/PaddingView',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};
