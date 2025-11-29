import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { MultiLineInput } from '.';

const meta: Meta<typeof MultiLineInput> = {
  component: MultiLineInput,
  title: 'Molecules/MultiLineInput',
};

export default meta;
type Story = StoryObj<typeof MultiLineInput>;

export const Default: Story = {
  args: {
    placeholderText: 'Enter your message...',
  },
};

export const Stateful: Story = {
  render: function StatefulInput() {
    const [value, setValue] = React.useState('');
    return (
      <MultiLineInput
        value={value}
        onValueChanged={setValue}
        placeholderText='Type something...'
      />
    );
  },
};

export const WithValue: Story = {
  args: {
    placeholderText: 'Enter message',
    value: 'This is some pre-filled content that spans multiple lines.\n\nIt demonstrates how the component handles multi-line text.',
  },
};

export const Success: Story = {
  args: {
    inputWrapperVariant: 'success',
    messageText: 'Message saved successfully',
    value: 'Valid content here',
  },
};

export const Error: Story = {
  args: {
    inputWrapperVariant: 'error',
    messageText: 'Message is required',
    placeholderText: 'Enter message',
  },
};

export const Disabled: Story = {
  args: {
    isEnabled: false,
    value: 'This input is disabled',
  },
};
