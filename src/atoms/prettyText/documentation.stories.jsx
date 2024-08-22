import React from 'react';

import { PrettyText } from '.';

function Template(args) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <PrettyText {...args}>
      <span>
        <b>Bold</b>
        {' '}
        and
        <i>italic</i>
        {' '}
        text
      </span>
    </PrettyText>
  );
}

export default {
  component: PrettyText,
  title: 'Atoms/PrettyText',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};

export const Header1 = {
  render: () => (
    <PrettyText variant='header1'>
      <b>Bold</b>
      and
      <i>italic</i>
      text
    </PrettyText>
  ),
  name: 'Header 1',
};

export const Header2 = {
  render: () => (
    <PrettyText variant='header2'>
      <b>Bold</b>
      and
      <i>italic</i>
      text
    </PrettyText>
  ),
  name: 'Header 2',
};

export const Header3 = {
  render: () => (
    <PrettyText variant='header3'>
      <b>Bold</b>
      and
      <i>italic</i>
      text
    </PrettyText>
  ),
  name: 'Header 3',
};

export const Header4 = {
  render: () => (
    <PrettyText variant='header4'>
      <b>Bold</b>
      and
      <i>italic</i>
      text
    </PrettyText>
  ),
  name: 'Header 4',
};

export const Header5 = {
  render: () => (
    <PrettyText variant='header5'>
      <b>Bold</b>
      and
      <i>italic</i>
      text
    </PrettyText>
  ),
  name: 'Header 5',
};
