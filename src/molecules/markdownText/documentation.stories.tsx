import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { MarkdownText } from '.';
import { Box } from '../../particles/box';

const meta: Meta<typeof MarkdownText> = {
  component: MarkdownText,
  title: 'Molecules/MarkdownText',
};

export default meta;
type Story = StoryObj<typeof MarkdownText>;

export const Default: Story = {
  args: {
    source: 'This is an **example**',
  },
};

export const WithFormatting: Story = {
  args: {
    source: 'Text with **bold**, *italic*, and **_both_**.',
  },
};

export const WithLink: Story = {
  args: {
    source: 'Made by [Kiba Labs](https://www.kibalabs.com)',
  },
};

export const Wrapped: Story = {
  render: () => (
    <Box width='200px'>
      <MarkdownText source='This is an **example with very long text** so we can see what things might look like if they get split on *multiple lines*.' />
    </Box>
  ),
};

export const WithNewlines: Story = {
  args: {
    source: 'First line\n\nSecond line\nThird line',
  },
};

export const NoteVariant: Story = {
  args: {
    textVariant: 'note',
    source: 'Made by [Kiba Labs](https://www.kibalabs.com)',
  },
};

export const HeaderVariant: Story = {
  args: {
    textVariant: 'header1',
    source: 'Look at this cool title',
  },
};
