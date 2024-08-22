import React from 'react';

import { ContainingView } from '.';
import { Box, Text } from '../../particles';

function Template(args) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ContainingView {...args}>
      <Box variant='card'>
        <Box width='2000px'>
          <Text>I&apos;m wrapped</Text>
        </Box>
      </Box>
    </ContainingView>
  );
}

export default {
  component: ContainingView,
  title: 'Wrappers/ContainingView',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};
