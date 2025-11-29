import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { BulletText } from '.';
import { BulletList } from '../bulletList';

const meta: Meta<typeof BulletText> = {
  component: BulletText,
  title: 'Atoms/BulletText',
  decorators: [
    (Story) => (
      <BulletList>
        <Story />
      </BulletList>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BulletText>;

export const Default: Story = {
  args: {
    text: "I'm a bullet point",
  },
};

export const MultipleBullets: Story = {
  render: () => (
    <BulletList>
      <BulletText text="First bullet item" />
      <BulletText text="Second bullet item" />
      <BulletText text="Third bullet item" />
    </BulletList>
  ),
  decorators: [],
};

export const WithNestedList: Story = {
  render: () => (
    <BulletList>
      <BulletText text="Parent item">
        <BulletList>
          <BulletText text="Nested item 1" />
          <BulletText text="Nested item 2" />
        </BulletList>
      </BulletText>
    </BulletList>
  ),
  decorators: [],
};
