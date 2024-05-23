import React from 'react';

import { Switch } from '.';

const Template = (args) => <Switch {...args} />;

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
