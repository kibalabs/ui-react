import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '.';
import { LayerContainer, Stack } from '../../layouts';
import { Image, Text } from '../../particles';

const meta: Meta<typeof Box> = {
  component: Box,
  title: 'Particles/Box',
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Box {...args}>
      <p>I&apos;m in a box</p>
    </Box>
  ),
};

export const Card: Story = {
  render: () => (
    <Box variant="card">
      <p>I&apos;m in a card box</p>
    </Box>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Box variant="bordered">
      <p>I&apos;m in a bordered box</p>
    </Box>
  ),
};

export const Padded: Story = {
  render: () => (
    <Box variant="padded">
      <p>I&apos;m in a padded box</p>
    </Box>
  ),
};

export const ScrollableHorizontally: Story = {
  render: () => (
    <Box width="100px" isScrollableHorizontally={true} isFullHeight={true}>
      <div style={{ backgroundColor: '#dddddd', width: '1000px', height: '50px' }} />
    </Box>
  ),
};

export const ScrollableVertically: Story = {
  render: () => (
    <Box height="100px" isScrollableVertically={true} isFullWidth={false}>
      <div style={{ backgroundColor: '#dddddd', height: '1000px', width: '50px' }} />
    </Box>
  ),
};

export const EmptyCardWithTooltip: Story = {
  render: () => (
    <Box variant="card" title="Tooltip on the Box" isFullWidth={false} />
  ),
};

export const ClippedContent: Story = {
  render: () => (
    <Box variant="rounded-borderColored" shouldClipContent={true} width="200px" height="200px">
      <LayerContainer>
        <Box isFullWidth={true} isFullHeight={true}>
          <Image
            fitType="cover"
            isFullHeight={true}
            isFullWidth={true}
            source="https://unsplash.com/photos/gsf4OfORp5c/download?force=true&w=640"
            alternativeText="Hot air balloon"
          />
        </Box>
        <LayerContainer.Layer isFullWidth={true} isFullHeight={true}>
          <Box isFullHeight={true}>
            <Stack isFullHeight={true} isFullWidth={true}>
              <Stack.Item growthFactor={1} shrinkFactor={1} />
              <Box variant="padded-overlay">
                <Text variant="paragraph-imageCaption" alignment="center">
                  Hot air balloon
                </Text>
              </Box>
            </Stack>
          </Box>
        </LayerContainer.Layer>
      </LayerContainer>
    </Box>
  ),
};
