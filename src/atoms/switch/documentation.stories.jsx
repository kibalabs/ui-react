import React from 'react';

import { Switch } from '.';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Switch {...args} />;
}

export default {
  component: Switch,
  title: 'Atoms/Switch',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
};

export const Stateful = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isChecked, setIsChecked] = React.useState(false);
    return (
      <Switch
        isChecked={isChecked}
        onToggled={() => setIsChecked(!isChecked)}
      />
    );
  },

  name: 'stateful',
};
