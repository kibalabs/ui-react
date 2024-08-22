import React from 'react';

import { EqualGrid } from '.';
import { KibaIcon } from '../../particles';

function Template(args) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <EqualGrid {...args}>
      <KibaIcon iconId='ion-airplane' />
      <KibaIcon iconId='ion-american-football' />
      <KibaIcon iconId='ion-at' />
      <KibaIcon iconId='ion-albums' />
      <KibaIcon iconId='ion-bag' />
      <KibaIcon iconId='ion-bonfire' />
    </EqualGrid>
  );
}

export default {
  component: EqualGrid,
  title: 'Layouts/EqualGrid',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    childSize: 3,
  },
};

export const DifferentChildSize = {
  render: () => (
    <EqualGrid childSize={5}>
      <KibaIcon iconId='ion-airplane' />
      <KibaIcon iconId='ion-american-football' />
      <KibaIcon iconId='ion-at' />
      <KibaIcon iconId='ion-albums' />
      <KibaIcon iconId='ion-bag' />
      <KibaIcon iconId='ion-bonfire' />
    </EqualGrid>
  ),

  name: 'Different child size',
};
