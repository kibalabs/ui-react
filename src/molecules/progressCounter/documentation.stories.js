import React from 'react';

import { ProgressCounter } from '.';

const Template = (args) => <ProgressCounter {...args} />;

export default {
  component: ProgressCounter,
  title: 'Molecules/ProgressCounter',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    stepCount: 5,
    selectedStepIndex: 2,
  },
};

export const TooMany = {
  render: () => <ProgressCounter stepCount={200} selectedStepIndex={5} />,
  name: 'Too many',
};
