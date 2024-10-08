import React from 'react';

import { SingleLineInput } from '.';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <SingleLineInput {...args} />;
}

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState('');
    return <SingleLineInput value={value} onValueChanged={setValue} />;
  },

  name: 'Stateful Example',
};

export const SuccessMessage = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
