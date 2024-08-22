import React from 'react';

import { StatefulTitledCollapsibleBox,
  TitledCollapsibleBox } from '.';

function Template(args) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TitledCollapsibleBox {...args}>
      <span> This is the content inside the box </span>
    </TitledCollapsibleBox>
  );
}

export default {
  component: TitledCollapsibleBox,
  title: 'Atoms/TitledCollapsibleBox',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    title: 'Here is a TitledCollapsibleBox',
    onCollapseToggled: () => {},
  },
};

export const Stateful = {
  render: () => (
    <StatefulTitledCollapsibleBox title='Stateful TitledCollapsibleBox'>
      <span>This is the content inside the box</span>
    </StatefulTitledCollapsibleBox>
  ),

  name: 'Stateful',
};

export const StatefulCollapsed = {
  render: () => (
    <StatefulTitledCollapsibleBox
      title='Stateful TitledCollapsibleBox (collapsed initially)'
      isCollapsedInitially={true}
    >
      <span>This is the content inside the box</span>
    </StatefulTitledCollapsibleBox>
  ),

  name: 'Stateful Collapsed',
};
