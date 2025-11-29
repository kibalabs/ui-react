import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { LinePager } from '.';

const meta: Meta<typeof LinePager> = {
  component: LinePager,
  title: 'Atoms/LinePager',
};

export default meta;
type Story = StoryObj<typeof LinePager>;

export const Default: Story = {
  args: {
    pageCount: 5,
    activePageIndex: 1,
  },
};

export const FirstPage: Story = {
  args: {
    pageCount: 5,
    activePageIndex: 0,
  },
};

export const LastPage: Story = {
  args: {
    pageCount: 5,
    activePageIndex: 4,
  },
};

export const ManyPages: Story = {
  args: {
    pageCount: 10,
    activePageIndex: 3,
  },
};

export const Interactive: Story = {
  render: function InteractivePager() {
    const [activeIndex, setActiveIndex] = React.useState(0);
    return (
      <LinePager
        pageCount={5}
        activePageIndex={activeIndex}
        onPageClicked={setActiveIndex}
      />
    );
  },
};
