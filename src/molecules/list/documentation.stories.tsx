import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { List } from '.';
import { Text } from '../../particles';

const meta: Meta<typeof List> = {
  component: List,
  title: 'Molecules/List',
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: function InteractiveList() {
    const [selectedItemKey, setSelectedItemKey] = React.useState<string | undefined>();
    return (
      <List selectedItemKey={selectedItemKey} onItemClicked={setSelectedItemKey}>
        <List.Item itemKey='1'>First Item</List.Item>
        <List.Item itemKey='2'>Second Item</List.Item>
        <List.Item itemKey='3'>Third Item</List.Item>
      </List>
    );
  },
};

export const NonClickable: Story = {
  render: () => (
    <List>
      <List.Item itemKey='1'>Item 1</List.Item>
      <List.Item itemKey='2'>Item 2</List.Item>
      <List.Item itemKey='3'>Item 3</List.Item>
    </List>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <List shouldShowDividers={true}>
      <List.Item itemKey='1'>Item 1</List.Item>
      <List.Item itemKey='2'>Item 2</List.Item>
      <List.Item itemKey='3'>Item 3</List.Item>
    </List>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <List onItemClicked={(key) => console.log(`Clicked: ${key}`)}>
      <List.Item itemKey='1' isDisabled={true}>Disabled Item 1</List.Item>
      <List.Item itemKey='2' isDisabled={true}>Disabled Item 2</List.Item>
      <List.Item itemKey='3' isDisabled={false}>Enabled Item 3</List.Item>
    </List>
  ),
};

export const WithCustomContent: Story = {
  render: function CustomContentList() {
    const [selectedItemKey, setSelectedItemKey] = React.useState<string | undefined>();
    return (
      <List selectedItemKey={selectedItemKey} onItemClicked={setSelectedItemKey}>
        <List.Item itemKey='1'>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Text>Product A</Text>
            <Text variant='note'>$19.99</Text>
          </div>
        </List.Item>
        <List.Item itemKey='2'>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Text>Product B</Text>
            <Text variant='note'>$29.99</Text>
          </div>
        </List.Item>
      </List>
    );
  },
};
