import React from 'react';

import { Container } from '.';

const Template = (args) => (
  <Container {...args}>
    <div
      style={{ backgroundColor: 'lightblue', width: '2000px', height: '200px' }}
    />
  </Container>
);

export default {
  component: Container,
  title: 'Layouts/Container',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    childSize: 3,
  },
};
