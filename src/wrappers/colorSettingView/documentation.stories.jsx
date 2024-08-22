import React from 'react';

import { ColorSettingView } from '.';
import { Box, Text } from '../../particles';

function Template(args) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ColorSettingView {...args}>
      <Box variant='card'>
        <Text>I&apos;m wrapped</Text>
      </Box>
    </ColorSettingView>
  );
}

export default {
  component: ColorSettingView,
  title: 'Wrappers/ColorSettingView',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    theme: {
      text: 'orange',
    },
  },
};
