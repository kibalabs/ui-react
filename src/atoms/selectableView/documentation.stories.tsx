import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SelectableView } from '.';
import { Box, KibaIcon, Text } from '../../particles';

const meta: Meta<typeof SelectableView> = {
  component: SelectableView,
  title: 'Atoms/SelectableView',
};

export default meta;
type Story = StoryObj<typeof SelectableView>;

export const Default: Story = {
  render: (args) => (
    <SelectableView {...args}>
      <Box variant="card" isFullWidth={false}>
        <Text>Selectable Item</Text>
      </Box>
    </SelectableView>
  ),
  args: {
    isSelected: false,
    onClicked: () => {},
  },
};

export const Selected: Story = {
  render: () => (
    <SelectableView isSelected={true} onClicked={() => {}}>
      <Box variant="card" isFullWidth={false}>
        <Text>Selected Item</Text>
      </Box>
    </SelectableView>
  ),
};

export const Interactive: Story = {
  render: function InteractiveSelectable() {
    const [isSelected, setIsSelected] = React.useState(false);
    return (
      <SelectableView isSelected={isSelected} onClicked={() => setIsSelected(!isSelected)}>
        <Box variant="card" isFullWidth={false}>
          <Text>{isSelected ? 'Selected' : 'Click to select'}</Text>
        </Box>
      </SelectableView>
    );
  },
};

export const MultipleSelection: Story = {
  render: function MultiSelect() {
    const [selected, setSelected] = React.useState<number[]>([]);
    const toggle = (index: number) => {
      setSelected((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    };
    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        {[0, 1, 2].map((index) => (
          <SelectableView
            key={index}
            isSelected={selected.includes(index)}
            onClicked={() => toggle(index)}
          >
            <Box variant="card" isFullWidth={false}>
              <Text>Option {index + 1}</Text>
            </Box>
          </SelectableView>
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <SelectableView isSelected={false} isDisabled={true} onClicked={() => {}}>
      <Box variant="card" isFullWidth={false}>
        <Text>Disabled Item</Text>
      </Box>
    </SelectableView>
  ),
};

export const CustomIndicator: Story = {
  render: function CustomIndicatorExample() {
    const [isSelected, setIsSelected] = React.useState(true);
    return (
      <SelectableView
        isSelected={isSelected}
        onClicked={() => setIsSelected(!isSelected)}
        selectedIndicator={<KibaIcon iconId="ion-star" variant="large" _color="gold" />}
      >
        <Box variant="card" isFullWidth={false}>
          <Text>Custom indicator</Text>
        </Box>
      </SelectableView>
    );
  },
};

export const NoDefaultIndicator: Story = {
  render: () => (
    <SelectableView
      isSelected={true}
      onClicked={() => {}}
      shouldHideDefaultSelectedIndicator={true}
    >
      <Box variant="card-selected" isFullWidth={false}>
        <Text>Selected (no overlay indicator)</Text>
      </Box>
    </SelectableView>
  ),
};
