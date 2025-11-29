import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { InputFrame } from '.';
import { Text } from '../../particles';

const meta: Meta<typeof InputFrame> = {
  component: InputFrame,
  title: 'Molecules/InputFrame',
};

export default meta;
type Story = StoryObj<typeof InputFrame>;

export const Default: Story = {
  render: () => (
    <InputFrame>
      <Text>Enter text here...</Text>
    </InputFrame>
  ),
};

export const WithValue: Story = {
  render: () => (
    <InputFrame>
      <Text>Some text content</Text>
    </InputFrame>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputFrame isEnabled={false}>
      <Text>Disabled input</Text>
    </InputFrame>
  ),
};
