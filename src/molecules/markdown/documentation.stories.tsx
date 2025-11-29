import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Markdown } from '.';

const meta: Meta<typeof Markdown> = {
  component: Markdown,
  title: 'Molecules/Markdown',
};

export default meta;
type Story = StoryObj<typeof Markdown>;

export const Default: Story = {
  args: {
    source: "This is an **example**\n\nIt's got [links](https://www.kibalabs.com)\n\n![cool image](https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg)",
  },
};

export const Headers: Story = {
  args: {
    source: '# H1\n\n## H2\n\n### H3\n\n#### H4\n\n##### H5\n\n###### H6',
  },
};

export const TextFormatting: Story = {
  args: {
    source: '**Bold text**\n\n*Italic text*\n\n**Bold and *italic* together**\n\n~~Strikethrough~~',
  },
};

export const BulletPoints: Story = {
  args: {
    source: 'Why UI-React is awesome:\n\n* It just is\n* I told you so\n* Third reason',
  },
};

export const NumberedList: Story = {
  args: {
    source: 'Steps to success:\n\n1. First step\n2. Second step\n3. Third step',
  },
};

export const Links: Story = {
  args: {
    source: 'Check out [Kiba Labs](https://www.kibalabs.com) for more info.\n\nOr visit https://www.example.com directly.',
  },
};

export const Images: Story = {
  args: {
    source: '![Gorilla](https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg)\nWith caption',
  },
};

export const Mixed: Story = {
  args: {
    source: `# Welcome

This is a **mixed example** with various markdown features.

## Features

* **Bold** and *italic* text
* [Links](https://www.kibalabs.com)
* Images and more

### Code

Inline \`code\` is supported too.`,
  },
};
