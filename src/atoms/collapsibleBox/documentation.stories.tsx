import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { CollapsibleBox, StatefulCollapsibleBox } from '.';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';
import { Box, Text } from '../../particles';

const meta: Meta<typeof CollapsibleBox> = {
  component: CollapsibleBox,
  title: 'Atoms/CollapsibleBox',
};

export default meta;
type Story = StoryObj<typeof CollapsibleBox>;

export const Default: Story = {
  args: {
    isCollapsed: false,
    headerView: <Box variant='padded'><Text variant='bold'>Click to collapse</Text></Box>,
    onCollapseToggled: () => {},
  },
  render: (args) => (
    <CollapsibleBox {...args}>
      <Box variant='padded'>
        <Text>This is the collapsible content inside the box.</Text>
      </Box>
    </CollapsibleBox>
  ),
};

export const Stateful: Story = {
  render: () => (
    <StatefulCollapsibleBox
      headerView={<Box variant='padded'><Text variant='bold'>Expandable Section</Text></Box>}
    >
      <Box variant='padded'>
        <Text>This content can be shown or hidden by clicking the header.</Text>
      </Box>
    </StatefulCollapsibleBox>
  ),
};

export const CollapsedInitially: Story = {
  render: () => (
    <StatefulCollapsibleBox
      isCollapsedInitially={true}
      headerView={<Box variant='padded'><Text variant='bold'>Click to expand</Text></Box>}
    >
      <Box variant='padded'>
        <Text>This content was hidden initially.</Text>
      </Box>
    </StatefulCollapsibleBox>
  ),
};

export const NoIndicator: Story = {
  render: () => (
    <StatefulCollapsibleBox
      shouldHideIndicator={true}
      headerView={<Box variant='padded'><Text variant='bold'>No expand/collapse indicator</Text></Box>}
    >
      <Box variant='padded'>
        <Text>The header has no arrow indicator.</Text>
      </Box>
    </StatefulCollapsibleBox>
  ),
};

export const Accordion: Story = {
  render: () => (
    <Stack direction={Direction.Vertical}>
      <StatefulCollapsibleBox
        headerView={<Box variant='padded'><Text variant='bold'>Section 1</Text></Box>}
      >
        <Box variant='padded'><Text>Content for section 1</Text></Box>
      </StatefulCollapsibleBox>
      <StatefulCollapsibleBox
        isCollapsedInitially={true}
        headerView={<Box variant='padded'><Text variant='bold'>Section 2</Text></Box>}
      >
        <Box variant='padded'><Text>Content for section 2</Text></Box>
      </StatefulCollapsibleBox>
      <StatefulCollapsibleBox
        isCollapsedInitially={true}
        headerView={<Box variant='padded'><Text variant='bold'>Section 3</Text></Box>}
      >
        <Box variant='padded'><Text>Content for section 3</Text></Box>
      </StatefulCollapsibleBox>
    </Stack>
  ),
};
