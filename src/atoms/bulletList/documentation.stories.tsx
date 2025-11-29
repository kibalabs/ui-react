import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { BulletList } from '.';
import { BulletText } from '../bulletText';

const meta: Meta<typeof BulletList> = {
  component: BulletList,
  title: 'Atoms/BulletList',
};

export default meta;
type Story = StoryObj<typeof BulletList>;

export const Default: Story = {
  render: (args) => (
    <BulletList {...args}>
      <BulletText text="First item" />
      <BulletText text="Second item" />
      <BulletText text="Third item" />
    </BulletList>
  ),
  args: {},
};

export const NestedList: Story = {
  render: () => (
    <BulletList>
      <BulletText text="Parent item">
        <BulletList>
          <BulletText text="Child item 1" />
          <BulletText text="Child item 2" />
        </BulletList>
      </BulletText>
      <BulletText text="Another parent" />
    </BulletList>
  ),
};

export const LongContent: Story = {
  render: () => (
    <BulletList>
      <BulletText text="This is a longer bullet point that demonstrates how text wraps when it exceeds the available width of the container." />
      <BulletText text="Shorter item" />
      <BulletText text="Another item with more detailed information that spans multiple lines for better readability." />
    </BulletList>
  ),
};
