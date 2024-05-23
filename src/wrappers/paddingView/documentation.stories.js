import React from 'react';

import { PaddingView } from '.';
import { Box, Text } from '../../particles';

const Template = (args) => (
  <PaddingView {...args}>
    <Box variant='card'>
      <Text>I&apos;m wrapped</Text>
    </Box>
  </PaddingView>
);

export default {
  component: PaddingView,
  title: 'Wrappers/PaddingView',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};
