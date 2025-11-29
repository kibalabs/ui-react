import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '.';

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Particles/Text',
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Text {...args}>Every word tells a story</Text>
  ),
};

export const Paragraph: Story = {
  render: () => <Text variant="paragraph">Every paragraph tells a story</Text>,
};

export const Inline: Story = {
  render: () => <Text variant="inline">Every inline word tells a story</Text>,
};

export const Bold: Story = {
  render: () => <Text variant="bold">Every bold word tells a story</Text>,
};

export const Strong: Story = {
  render: () => <Text variant="strong">Every word tells a story</Text>,
};

export const Italic: Story = {
  render: () => <Text variant="italic">Every word tells a story</Text>,
};

export const Emphasis: Story = {
  render: () => <Text variant="emphasis">Every word tells a story</Text>,
};

export const Underline: Story = {
  render: () => <Text variant="underline">Every word tells a story</Text>,
};

export const Mark: Story = {
  render: () => <Text variant="mark">Every word tells a story</Text>,
};

export const Small: Story = {
  render: () => <Text variant="small">Every word tells a story</Text>,
};

export const Deleted: Story = {
  render: () => <Text variant="deleted">Every word tells a story</Text>,
};

export const Inserted: Story = {
  render: () => <Text variant="inserted">Every word tells a story</Text>,
};

export const Subscript: Story = {
  render: () => <Text variant="subscript">Every word tells a story</Text>,
};

export const Superscript: Story = {
  render: () => <Text variant="superscript">Every word tells a story</Text>,
};

export const Header1: Story = {
  render: () => <Text variant="header1">Heading Level 1</Text>,
};

export const Header2: Story = {
  render: () => <Text variant="header2">Heading Level 2</Text>,
};

export const Header3: Story = {
  render: () => <Text variant="header3">Heading Level 3</Text>,
};

export const Header4: Story = {
  render: () => <Text variant="header4">Heading Level 4</Text>,
};

export const Header5: Story = {
  render: () => <Text variant="header5">Heading Level 5</Text>,
};

export const Header6: Story = {
  render: () => <Text variant="header6">Heading Level 6</Text>,
};

export const Note: Story = {
  render: () => <Text variant="note">This is a note with smaller, lighter text</Text>,
};

export const Supersize: Story = {
  render: () => <Text variant="supersize">HUGE</Text>,
};

export const Colored: Story = {
  render: () => <Text variant="colored">Brand colored text</Text>,
};

export const Error: Story = {
  render: () => <Text variant="error">Error message</Text>,
};

export const Success: Story = {
  render: () => <Text variant="success">Success message</Text>,
};

export const SingleLine: Story = {
  render: () => (
    <Text lineLimit={1}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry&apos;s standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book.
    </Text>
  ),
};

export const MultiLine: Story = {
  render: () => (
    <Text lineLimit={3}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry&apos;s standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged.
    </Text>
  ),
};

export const CombinedVariants: Story = {
  render: () => <Text variant="header2-bold-colored">Combined variants</Text>,
};
