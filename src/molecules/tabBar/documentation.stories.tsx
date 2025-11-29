import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { TabBar } from '.';
import { Alignment } from '../../model';

const meta: Meta<typeof TabBar> = {
  component: TabBar,
  title: 'Molecules/TabBar',
};

export default meta;
type Story = StoryObj<typeof TabBar>;

export const Default: Story = {
  render: function InteractiveTabBar() {
    const [selectedTabKey, setSelectedTabKey] = React.useState<string | undefined>('1');
    return (
      <TabBar selectedTabKey={selectedTabKey} onTabKeySelected={setSelectedTabKey}>
        <TabBar.Item tabKey="1" text="First" />
        <TabBar.Item tabKey="2" text="Second" />
        <TabBar.Item tabKey="3" text="Third" />
      </TabBar>
    );
  },
};

export const FullWidth: Story = {
  render: () => (
    <TabBar isFullWidth={true}>
      <TabBar.Item tabKey="1" text="First" />
      <TabBar.Item tabKey="2" text="Second" />
      <TabBar.Item tabKey="3" text="Third" />
    </TabBar>
  ),
};

export const AlignmentStart: Story = {
  render: () => (
    <TabBar contentAlignment={Alignment.Start} isFullWidth={false}>
      <TabBar.Item tabKey="1" text="First" />
      <TabBar.Item tabKey="2" text="Second" />
    </TabBar>
  ),
};

export const AlignmentCenter: Story = {
  render: () => (
    <TabBar contentAlignment={Alignment.Center} isFullWidth={false}>
      <TabBar.Item tabKey="1" text="First" />
      <TabBar.Item tabKey="2" text="Second" />
    </TabBar>
  ),
};

export const AlignmentEnd: Story = {
  render: () => (
    <TabBar contentAlignment={Alignment.End} isFullWidth={false}>
      <TabBar.Item tabKey="1" text="First" />
      <TabBar.Item tabKey="2" text="Second" />
    </TabBar>
  ),
};

export const LongText: Story = {
  render: () => (
    <TabBar isFullWidth={false}>
      <TabBar.Item tabKey="1" text="First" />
      <TabBar.Item tabKey="2" text="This is a very long tab title that might wrap" />
      <TabBar.Item tabKey="3" text="Third" />
    </TabBar>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <TabBar>
      {Array.from({ length: 10 }, (_, i) => (
        <TabBar.Item key={i} tabKey={String(i)} text={`Tab ${i + 1}`} />
      ))}
    </TabBar>
  ),
};
