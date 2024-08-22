import React from 'react';

import { TabBar } from '.';
import { Alignment } from '../../model';

function Template(args) {
  const [selectedTabKey, setSelectedTabKey] = React.useState();
  return (
    <TabBar
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...args}
      selectedTabKey={args.selectedTabKey || selectedTabKey}
      onTabKeySelected={args.setSelectedTabKey || setSelectedTabKey}
    >
      <TabBar.Item tabKey={String(1)} text='First' />
      <TabBar.Item tabKey={String(2)} text='Second' />
      <TabBar.Item tabKey={String(3)} text='Third' />
    </TabBar>
  );
}

export default {
  component: TabBar,
  title: 'Molecules/TabBar',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};

export const FullWidth = {
  render: () => (
    <TabBar isFullWidth={true}>
      <TabBar.Item tabKey={String(1)} text='First' />
      <TabBar.Item tabKey={String(2)} text='Second' />
      <TabBar.Item tabKey={String(3)} text='Third' />
    </TabBar>
  ),

  name: 'Full width',
};

export const ContentAlignmentStart = {
  render: () => (
    <TabBar contentAlignment={Alignment.Start} isFullWidth={false}>
      <TabBar.Item tabKey={String(1)} text='First' />
      <TabBar.Item tabKey={String(2)} text='Second' />
    </TabBar>
  ),

  name: 'Content Alignment - Start',
};

export const ContentAlignmentCenter = {
  render: () => (
    <TabBar contentAlignment={Alignment.Center} isFullWidth={false}>
      <TabBar.Item tabKey={String(1)} text='First' />
      <TabBar.Item tabKey={String(2)} text='Second' />
    </TabBar>
  ),

  name: 'Content Alignment - Center',
};

export const ContentAlignmentEnd = {
  render: () => (
    <TabBar contentAlignment={Alignment.End} isFullWidth={false}>
      <TabBar.Item tabKey={String(1)} text='First' />
      <TabBar.Item tabKey={String(2)} text='Second' />
    </TabBar>
  ),

  name: 'Content Alignment - End',
};

export const FullWidthWithLongText = {
  render: () => (
    <TabBar isFullWidth={true}>
      <TabBar.Item tabKey={String(1)} text='First' />
      <TabBar.Item
        tabKey={String(2)}
        text='Second one is super long. I mean super, duper, extra long! Oh yeah, I really mean super alifragislistexpialodicious-ly long!'
      />
      <TabBar.Item tabKey={String(3)} text='Third' />
    </TabBar>
  ),

  name: 'Full width with long text',
};

export const LongText = {
  render: () => (
    <TabBar isFullWidth={false}>
      <TabBar.Item tabKey={String(1)} text='First' />
      <TabBar.Item
        tabKey={String(2)}
        text='Second one is super long. I mean super, duper, extra long! Oh yeah, I really mean super alifragislistexpialodicious-ly long!'
      />
      <TabBar.Item tabKey={String(3)} text='Third' />
    </TabBar>
  ),

  name: 'Long text',
};

export const TooMany = {
  render: () => (
    <TabBar>
      {Array(50)
        .fill(null)
        .map((_, index) => {
          return (
            <TabBar.Item
            // eslint-disable-next-line react/no-array-index-key
              key={index}
              tabKey={String(index)}
              text={`Tab ${index}`}
            />
          );
        })}
    </TabBar>
  ),

  name: 'Too many',
};
