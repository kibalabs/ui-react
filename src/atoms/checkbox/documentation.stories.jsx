import React from 'react';

import { Checkbox } from '.';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Checkbox {...args} />;
}

export default {
  component: Checkbox,
  title: 'Atoms/Checkbox',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    text: 'Default Checkbox',
  },
};

export const WrappedState = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isChecked, setIsChecked] = React.useState(true);

    return (
      <Checkbox
        isChecked={isChecked}
        onToggled={() => setIsChecked(!isChecked)}
        text='A Simple Checkbox'
      />
    );
  },

  name: 'Wrapped state',
};

export const Disabled = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isChecked, setIsChecked] = React.useState(true);

    return (
      <Checkbox
        isChecked={isChecked}
        onToggled={() => setIsChecked(!isChecked)}
        isDisabled={true}
        text='Disabled Checkbox'
      />
    );
  },

  name: 'Disabled',
};
