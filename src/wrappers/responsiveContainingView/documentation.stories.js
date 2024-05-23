import React from 'react';

import { ResponsiveContainingView } from '.';
import { Box, Text } from '../../particles';

const Template = (args) => (
  <ResponsiveContainingView {...args}>
    <Box variant='card'>
      <Box width={'2000px'}>
        <Text>I&apos;m wrapped</Text>
      </Box>
    </Box>
  </ResponsiveContainingView>
);

export default {
  component: ResponsiveContainingView,
  title: 'Wrappers/ResponsiveContainingView',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    size: 10,
  },
};
