import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Portal, Placement } from '.';
import { Box } from '../box';
import { Text } from '../text';

const meta: Meta<typeof Portal> = {
  component: Portal,
  title: 'Particles/Portal',
};

export default meta;
type Story = StoryObj<typeof Portal>;

export const Default: Story = {
  render: function DefaultStory() {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
      <div>
        <div ref={ref} style={{ display: 'inline-block', padding: '8px', border: '1px solid #ccc' }}>
          Anchor Element
        </div>
        <Portal anchorElement={ref} placement={Placement.bottomLeft}>
          <Box variant="card">
            <Text>Portal content</Text>
          </Box>
        </Portal>
      </div>
    );
  },
};

export const BottomRight: Story = {
  render: function BottomRightStory() {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
      <div>
        <div ref={ref} style={{ display: 'inline-block', padding: '8px', border: '1px solid #ccc' }}>
          Click me
        </div>
        <Portal anchorElement={ref} placement={Placement.bottomRight}>
          <Box variant="card" width="200px">
            <Text>Anchored at bottom-right</Text>
          </Box>
        </Portal>
      </div>
    );
  },
};

export const BottomCenter: Story = {
  render: function BottomCenterStory() {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div ref={ref} style={{ display: 'inline-block', padding: '8px', border: '1px solid #ccc' }}>
          Center anchor
        </div>
        <Portal anchorElement={ref} placement={Placement.bottomCenter}>
          <Box variant="card" width="200px">
            <Text>Anchored at bottom-center</Text>
          </Box>
        </Portal>
      </div>
    );
  },
};

export const TopPlacements: Story = {
  render: function TopPlacementsStory() {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
      <div style={{ marginTop: '100px' }}>
        <div ref={ref} style={{ display: 'inline-block', padding: '8px', border: '1px solid #ccc' }}>
          Anchor
        </div>
        <Portal anchorElement={ref} placement={Placement.topLeft}>
          <Box variant="card" width="200px">
            <Text>Anchored at top-left</Text>
          </Box>
        </Portal>
      </div>
    );
  },
};

export const MatchAnchorWidth: Story = {
  render: function MatchAnchorWidthStory() {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
      <div>
        <div ref={ref} style={{ display: 'inline-block', padding: '8px', border: '1px solid #ccc', width: '300px' }}>
          Wide anchor element
        </div>
        <Portal anchorElement={ref} placement={Placement.bottomLeft} shouldMatchAnchorWidth={true}>
          <Box variant="card">
            <Text>This portal matches the anchor width</Text>
          </Box>
        </Portal>
      </div>
    );
  },
};

export const Dropdown: Story = {
  render: function DropdownStory() {
    const ref = React.useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <div>
        <button ref={ref as React.RefObject<HTMLButtonElement>} onClick={() => setIsOpen(!isOpen)} type="button">
          Toggle Dropdown
        </button>
        {isOpen && (
          <Portal anchorElement={ref} placement={Placement.bottomLeft} shouldMatchAnchorWidth={true}>
            <Box variant="card">
              <Text>Option 1</Text>
              <Text>Option 2</Text>
              <Text>Option 3</Text>
            </Box>
          </Portal>
        )}
      </div>
    );
  },
};
