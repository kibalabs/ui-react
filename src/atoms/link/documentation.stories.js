import React from 'react';

import { Link } from '.';

const Template = (args) => <Link {...args} />;

export default {
  component: Link,
  title: 'Atoms/Link',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    text: 'Default Link',
  },
};

export const Disabled = {
  render: () => <Link text='Disabled Link' isEnabled={false} />,
  name: 'Disabled',
};

export const LinkWithOnClicked = {
  render: () => (
    <Link
      text='Link with onClicked'
      onClicked={() => {
        // eslint-disable-next-line no-console
        console.log('Link Clicked');
      }}
    />
  ),

  name: 'Link with onClicked',
};
