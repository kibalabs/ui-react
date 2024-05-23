import React from 'react';

import { MultiLineInput } from '.';

const Template = (args) => <MultiLineInput {...args} />;

export default {
  component: MultiLineInput,
  title: 'Molecules/MultiLineInput',
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState('');
    return <MultiLineInput value={value} onValueChanged={setValue} />;
  },

  name: 'Stateful Example',
};

export const SuccessMessage = {
  render: () => (
    <MultiLineInput
      inputWrapperVariant='success'
      messageText='Success message'
    />
  ),
  name: 'Success Message',
};

export const ErrorMessage = {
  render: () => (
    <MultiLineInput inputWrapperVariant='error' messageText='Error message' />
  ),
  name: 'Error Message',
};

export const Disabled = {
  render: () => <MultiLineInput isEnabled={false} />,
  name: 'Disabled',
};
