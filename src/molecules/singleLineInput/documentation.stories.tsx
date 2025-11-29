import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SingleLineInput } from '.';
import { InputType } from '../../model';

const meta: Meta<typeof SingleLineInput> = {
  component: SingleLineInput,
  title: 'Molecules/SingleLineInput',
};

export default meta;
type Story = StoryObj<typeof SingleLineInput>;

export const Default: Story = {
  args: {
    placeholderText: 'Enter text here...',
  },
};

export const Stateful: Story = {
  render: function StatefulInput() {
    const [value, setValue] = React.useState('');
    return (
      <SingleLineInput
        value={value}
        onValueChanged={setValue}
        placeholderText='Type something...'
      />
    );
  },
};

export const WithValue: Story = {
  args: {
    placeholderText: 'Enter text',
    value: 'Pre-filled value',
  },
};

export const Success: Story = {
  render: function SuccessInput() {
    const [value, setValue] = React.useState('Valid email');
    return (
      <SingleLineInput
        inputWrapperVariant='success'
        messageText='Email is valid'
        value={value}
        onValueChanged={setValue}
      />
    );
  },
};

export const Error: Story = {
  render: function ErrorInput() {
    const [value, setValue] = React.useState('');
    return (
      <SingleLineInput
        inputWrapperVariant='error'
        messageText='This field is required'
        value={value}
        onValueChanged={setValue}
        placeholderText='Required field'
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    isEnabled: false,
    value: 'Disabled input',
  },
};

export const Password: Story = {
  render: function PasswordInput() {
    const [value, setValue] = React.useState('');
    return (
      <SingleLineInput
        inputType={InputType.Password}
        value={value}
        onValueChanged={setValue}
        placeholderText='Enter password'
      />
    );
  },
};
