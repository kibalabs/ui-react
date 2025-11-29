import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { InputFrame } from '.';

const meta: Meta<typeof InputFrame> = {
  component: InputFrame,
  title: 'Molecules/InputFrame',
};

export default meta;
type Story = StoryObj<typeof InputFrame>;

export const Default: Story = {
  args: {
    placeholderText: 'Enter text here...',
  },
};

export const WithValue: Story = {
  args: {
    placeholderText: 'Enter text here...',
    value: 'Some text content',
  },
};

export const Disabled: Story = {
  args: {
    placeholderText: 'Disabled input',
    isEnabled: false,
  },
};
