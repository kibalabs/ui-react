import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Link } from '.';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';
import { Text } from '../../particles';

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'Atoms/Link',
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    text: 'Click here',
    target: 'https://kibalabs.com',
  },
  render: (args) => <Link {...args} />,
};

export const External: Story = {
  render: () => (
    <Link text='Visit Kiba Labs' target='https://kibalabs.com' />
  ),
};

export const SameTab: Story = {
  render: () => (
    <Link text='Open in same tab' target='https://kibalabs.com' shouldOpenSameTab={true} />
  ),
};

export const Disabled: Story = {
  render: () => (
    <Link text='Disabled link' target='https://kibalabs.com' isEnabled={false} />
  ),
};

export const WithCallback: Story = {
  render: function WithCallbackStory() {
    const [clicked, setClicked] = React.useState(false);
    return (
      <Stack direction={Direction.Vertical} shouldAddGutters={true}>
        <Link
          text='Click me'
          onClicked={() => setClicked(true)}
        />
        <Text>{clicked ? 'Link was clicked!' : 'Link not clicked yet'}</Text>
      </Stack>
    );
  },
};

export const InlineWithText: Story = {
  render: () => (
    <Text>
      Please read our
      {' '}
      <Link text='terms of service' target='https://kibalabs.com' />
      {' '}
      and
      {' '}
      <Link text='privacy policy' target='https://kibalabs.com' />
      {' '}
      before continuing.
    </Text>
  ),
};
