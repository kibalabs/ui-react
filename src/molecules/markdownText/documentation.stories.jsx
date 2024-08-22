import React from 'react';

import { MarkdownText } from '.';
import { Box } from '../../particles/box';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MarkdownText {...args} />;
}

export default {
  component: MarkdownText,
  title: 'Molecules/MarkdownText',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    source: 'this is an **example**',
  },
};

export const Simple = {
  render: () => <MarkdownText source='this is an **example**' />,
  name: 'Simple',
};

export const VeryLong = {
  render: () => (
    <Box width='200px'>
      <MarkdownText
        source='this is an **example with very long text** so we can see what things might look like if they get split on *multiple lines*, you know.'
      />
    </Box>
  ),

  name: 'very long',
};

export const WithNewlines = {
  render: () => (
    <MarkdownText
      source={
        'This should be rendered as **a single tag with BRs** in between\n\nIt should not be two separate P tags\nmkay?'
      }
    />
  ),

  name: 'With newlines',
};

export const Link = {
  render: () => (
    <MarkdownText source='Made by [Kiba Labs](https://www.kibalabs.com)' />
  ),
  name: 'Link',
};

export const LinkAsNote = {
  render: () => (
    <MarkdownText
      textVariant='note'
      source='Made by [Kiba Labs](https://www.kibalabs.com)'
    />
  ),

  name: 'Link as note',
};

export const CustomTheme = {
  render: () => (
    <MarkdownText textVariant='fancy' source='Made by **Kiba Labs**' />
  ),
  name: 'Custom theme',
};

export const CustomVariant = {
  render: () => (
    <MarkdownText textVariant='header1' source='Look at this cool title' />
  ),
  name: 'Custom variant',
};
