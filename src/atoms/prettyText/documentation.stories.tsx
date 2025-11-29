import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { PrettyText } from '.';
import { TextAlignment } from '../../particles/text';

const meta: Meta<typeof PrettyText> = {
  component: PrettyText,
  title: 'Atoms/PrettyText',
};

export default meta;
type Story = StoryObj<typeof PrettyText>;

export const Default: Story = {
  render: (args) => (
    <PrettyText {...args}>
      <span>
        <b>Bold</b>
        {' '}
        and
        {' '}
        <i>italic</i>
        {' '}
        text
      </span>
    </PrettyText>
  ),
  args: {},
};

export const Headers: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <PrettyText variant='header1'>
        <span>
          Header 1 with
          <b>bold</b>
        </span>
      </PrettyText>
      <PrettyText variant='header2'>
        <span>
          Header 2 with
          <i>italic</i>
        </span>
      </PrettyText>
      <PrettyText variant='header3'>
        <span>Header 3 styled text</span>
      </PrettyText>
      <PrettyText variant='header4'>
        <span>Header 4 styled text</span>
      </PrettyText>
      <PrettyText variant='header5'>
        <span>Header 5 styled text</span>
      </PrettyText>
    </div>
  ),
};

export const MixedFormatting: Story = {
  render: () => (
    <PrettyText>
      <span>
        Text with
        {' '}
        <b>bold</b>
        ,
        {' '}
        <i>italic</i>
        ,
        {' '}
        <u>underline</u>
        ,
        and
        {' '}
        <b><i>bold italic</i></b>
        {' '}
        formatting.
      </span>
    </PrettyText>
  ),
};

export const WithAlignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <PrettyText alignment={TextAlignment.Left}>
        <span>Left aligned text</span>
      </PrettyText>
      <PrettyText alignment={TextAlignment.Center}>
        <span>Center aligned text</span>
      </PrettyText>
      <PrettyText alignment={TextAlignment.Right}>
        <span>Right aligned text</span>
      </PrettyText>
    </div>
  ),
};
