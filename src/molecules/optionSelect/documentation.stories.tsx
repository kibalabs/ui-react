import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OptionSelect } from '.';

const meta: Meta<typeof OptionSelect> = {
  component: OptionSelect,
  title: 'Molecules/OptionSelect',
};

export default meta;
type Story = StoryObj<typeof OptionSelect>;

const defaultOptions = [
  { itemKey: '1', text: 'First Option' },
  { itemKey: '2', text: 'Second Option' },
  { itemKey: '3', text: 'Third Option' },
];

export const Default: Story = {
  render: function InteractiveSelect() {
    const [selectedItemKey, setSelectedItemKey] = React.useState('');
    return (
      <div style={{ height: '200px' }}>
        <OptionSelect
          options={defaultOptions}
          selectedItemKey={selectedItemKey}
          onItemClicked={setSelectedItemKey}
        />
      </div>
    );
  },
};

export const WithPreselection: Story = {
  render: function PreselectedSelect() {
    const [selectedItemKey, setSelectedItemKey] = React.useState('2');
    return (
      <div style={{ height: '200px' }}>
        <OptionSelect
          options={defaultOptions}
          selectedItemKey={selectedItemKey}
          onItemClicked={setSelectedItemKey}
        />
      </div>
    );
  },
};

export const LongOptions: Story = {
  render: function LongOptionsSelect() {
    const [selectedItemKey, setSelectedItemKey] = React.useState('');
    const options = [
      { itemKey: '1', text: 'Short' },
      { itemKey: '2', text: 'This is a very very long option text' },
      { itemKey: '3', text: 'Medium length option' },
    ];
    return (
      <div style={{ height: '200px' }}>
        <OptionSelect
          isFullWidth={false}
          options={options}
          selectedItemKey={selectedItemKey}
          onItemClicked={setSelectedItemKey}
        />
      </div>
    );
  },
};

export const ManyOptions: Story = {
  render: function ManyOptionsSelect() {
    const [selectedItemKey, setSelectedItemKey] = React.useState('');
    const options = Array.from({ length: 10 }, (_, i) => ({
      itemKey: String(i + 1),
      text: `Option ${i + 1}`,
    }));
    return (
      <div style={{ height: '300px' }}>
        <OptionSelect
          options={options}
          selectedItemKey={selectedItemKey}
          onItemClicked={setSelectedItemKey}
        />
      </div>
    );
  },
};

export const FullWidth: Story = {
  render: function FullWidthSelect() {
    const [selectedItemKey, setSelectedItemKey] = React.useState('');
    return (
      <div style={{ height: '200px' }}>
        <OptionSelect
          isFullWidth={true}
          options={defaultOptions}
          selectedItemKey={selectedItemKey}
          onItemClicked={setSelectedItemKey}
        />
      </div>
    );
  },
};
