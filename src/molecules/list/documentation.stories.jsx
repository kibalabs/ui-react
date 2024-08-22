import React from 'react';

import { List } from '.';

function Template(args) {
  const [selectedItemKey, setSelectedItemKey] = React.useState();
  return (
    <List
    // eslint-disable-next-line react/jsx-props-no-spreading
      {...args}
      selectedItemKey={args.selectedItemKey || selectedItemKey}
      onItemClicked={args.setSelectedItemKey || setSelectedItemKey}
    >
      <List.Item itemKey={String(1)}>First</List.Item>
      <List.Item itemKey={String(2)}>Second</List.Item>
      <List.Item itemKey={String(3)}>Third</List.Item>
    </List>
  );
}

export default {
  component: List,
  title: 'Molecules/List',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};

export const UnClickableList = {
  render: () => (
    <List>
      <List.Item itemKey={String(1)}>Item 1</List.Item>
      <List.Item itemKey={String(2)}>Item 2</List.Item>
      <List.Item itemKey={String(3)}>Item 3</List.Item>
    </List>
  ),

  name: 'Un-clickable List',
  args: {},
};

export const ClickWithoutSelectingList = {
  render: () => (
    <List
      // eslint-disable-next-line no-console
      onItemClicked={(itemKey) => console.log(`clicked list item with key: ${itemKey}`)}
    >
      <List.Item itemKey={String(1)}>Item 1</List.Item>
      <List.Item itemKey={String(2)}>Item 2</List.Item>
      <List.Item itemKey={String(3)}>Item 3</List.Item>
    </List>
  ),

  name: 'Click without selecting List',
  args: {},
};

export const WithDividers = {
  render: () => (
    <List shouldShowDividers={true}>
      <List.Item itemKey={String(1)}>Item 1</List.Item>
      <List.Item itemKey={String(2)}>Item 2</List.Item>
      <List.Item itemKey={String(3)}>Item 3</List.Item>
    </List>
  ),

  name: 'With dividers',
  args: {},
};

export const WithDisabledItems = {
  render: () => (
    <List
      // eslint-disable-next-line no-console
      onItemClicked={(itemKey) => console.log(`clicked list item with key: ${itemKey}`)}
    >
      <List.Item isDisabled={true} itemKey={String(1)}>
        Item 1
      </List.Item>
      <List.Item isDisabled={true} itemKey={String(2)}>
        Item 2
      </List.Item>
      <List.Item isDisabled={false} itemKey={String(3)}>
        Item 3
      </List.Item>
    </List>
  ),

  name: 'With disabled items',
  args: {},
};
