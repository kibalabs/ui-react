import React from 'react';

import { Divider } from '.';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';
import { Text } from '../text';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Divider {...args} />;
}

export default {
  component: Divider,
  title: 'Particles/Divider',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};

export const HorizontalDivider = {
  render: () => <Divider />,
  name: 'Horizontal Divider',
};

export const VerticalDivider = {
  render: () => (
    <Stack direction={Direction.Horizontal}>
      <Text>Hello</Text>
      <Divider orientation='vertical' />
      <Text>World</Text>
    </Stack>
  ),

  name: 'Vertical Divider',
};
