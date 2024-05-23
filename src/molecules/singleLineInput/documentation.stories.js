import React from 'react';

import { SingleLineInput } from '.';

const Template = (args) => <SingleLineInput {...args} />;

export default {
  component: SingleLineInput,
  title: 'Molecules/SingleLineInput',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    placeholderText: 'What do you say?',
  },
};

export const StatefulExample = {
  render: () => {
    const [value, setValue] = React.useState('');
    return <SingleLineInput value={value} onValueChanged={setValue} />;
  },

  name: 'Stateful Example',
};

export const SuccessMessage = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <SingleLineInput
        inputWrapperVariant='success'
        messageText='Success message'
        value={value}
        onValueChanged={setValue}
      />
    );
  },

  name: 'Success Message',
};

export const ErrorMessage = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <SingleLineInput
        inputWrapperVariant='error'
        messageText='Error message'
        value={value}
        onValueChanged={setValue}
      />
    );
  },

  name: 'Error Message',
};

export const Disabled = {
  render: () => <SingleLineInput isEnabled={false} />,
  name: 'Disabled',
};
