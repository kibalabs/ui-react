import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '.';

const meta: Meta<typeof Container> = {
  component: Container,
  title: 'Layouts/Container',
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <div style={{ backgroundColor: 'lightblue', width: '2000px', height: '200px' }} />
    </Container>
  ),
  args: {},
};

export const WithContent: Story = {
  render: () => (
    <Container>
      <div style={{ backgroundColor: 'lightblue', height: '100px' }}>
        Content is contained within a max-width
      </div>
    </Container>
  ),
};
