import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { StatefulTitledCollapsibleBox, TitledCollapsibleBox } from '.';
import { Text } from '../../particles';

const meta: Meta<typeof TitledCollapsibleBox> = {
  component: TitledCollapsibleBox,
  title: 'Atoms/TitledCollapsibleBox',
};

export default meta;
type Story = StoryObj<typeof TitledCollapsibleBox>;

export const Default: Story = {
  args: {
    title: 'Titled Collapsible Box',
    isCollapsed: false,
    onCollapseToggled: () => {},
    children: <Text>This is the content inside the box</Text>,
  },
};

export const Stateful: Story = {
  render: () => (
    <StatefulTitledCollapsibleBox title='Stateful Box'>
      <Text>This manages its own collapse state</Text>
    </StatefulTitledCollapsibleBox>
  ),
};

export const CollapsedInitially: Story = {
  render: () => (
    <StatefulTitledCollapsibleBox title='Initially Collapsed' isCollapsedInitially={true}>
      <Text>This content was hidden initially</Text>
    </StatefulTitledCollapsibleBox>
  ),
};

export const Accordion: Story = {
  render: function AccordionExample() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);
    const items = [
      { title: 'Section 1', content: 'Content for section 1' },
      { title: 'Section 2', content: 'Content for section 2' },
      { title: 'Section 3', content: 'Content for section 3' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {items.map((item, index) => (
          <TitledCollapsibleBox
            key={index}
            title={item.title}
            isCollapsed={openIndex !== index}
            onCollapseToggled={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <Text>{item.content}</Text>
          </TitledCollapsibleBox>
        ))}
      </div>
    );
  },
};

export const FAQ: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <StatefulTitledCollapsibleBox title='What is this component?'>
        <Text>TitledCollapsibleBox is a collapsible container with a built-in title header.</Text>
      </StatefulTitledCollapsibleBox>
      <StatefulTitledCollapsibleBox title='When should I use it?' isCollapsedInitially={true}>
        <Text>Use it for FAQs, accordions, or any content that can be hidden to save space.</Text>
      </StatefulTitledCollapsibleBox>
      <StatefulTitledCollapsibleBox title='How is it different from CollapsibleBox?' isCollapsedInitially={true}>
        <Text>This component includes a styled title header, while CollapsibleBox lets you provide custom header content.</Text>
      </StatefulTitledCollapsibleBox>
    </div>
  ),
};
