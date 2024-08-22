import React from 'react';

import { LinePager } from '.';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <LinePager {...args} />;
}

export default {
  component: LinePager,
  title: 'Atoms/LinePager',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    pageCount: 5,
    activePageIndex: 1,
  },
};

export const Simple = {
  render: () => (
    <LinePager variant='default' pageCount={5} activePageIndex={1} />
  ),
  name: 'Simple',
};

export const Many = {
  render: () => (
    <LinePager variant='default' pageCount={500} activePageIndex={1} />
  ),
  name: 'Many',
};
