import React from 'react';

import { SelectableView } from '.';
import { KibaIcon } from '../../particles';

function Template(args) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SelectableView {...args}>
      <KibaIcon iconId='ion-bulb' />
    </SelectableView>
  );
}

export default {
  component: SelectableView,
  title: 'Atoms/SelectableView',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};
