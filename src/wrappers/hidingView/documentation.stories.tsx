import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { HidingView } from '.';
import { Button } from '../../atoms';
import { Box, Text } from '../../particles';

const meta: Meta<typeof HidingView> = {
  component: HidingView,
  title: 'Wrappers/HidingView',
};

export default meta;
type Story = StoryObj<typeof HidingView>;

export const Default: Story = {
  render: (args) => (
    <HidingView {...args}>
      <Box variant="card">
        <Text>This content can be hidden</Text>
      </Box>
    </HidingView>
  ),
  args: {
    isHidden: false,
  },
};

export const Hidden: Story = {
  render: () => (
    <HidingView isHidden={true}>
      <Box variant="card">
        <Text>This content is hidden</Text>
      </Box>
    </HidingView>
  ),
};

export const Visible: Story = {
  render: () => (
    <HidingView isHidden={false}>
      <Box variant="card">
        <Text>This content is visible</Text>
      </Box>
    </HidingView>
  ),
};

export const Interactive: Story = {
  render: function InteractiveHiding() {
    const [isHidden, setIsHidden] = React.useState(false);
    return (
      <div>
        <Button
          text={isHidden ? 'Show' : 'Hide'}
          onClicked={() => setIsHidden(!isHidden)}
        />
        <HidingView isHidden={isHidden}>
          <Box variant="card">
            <Text>Toggle my visibility</Text>
          </Box>
        </HidingView>
      </div>
    );
  },
};
