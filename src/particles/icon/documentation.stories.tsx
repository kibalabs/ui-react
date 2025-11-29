import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '.';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';
import { Text } from '../text';

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'Particles/Icon',
};

export default meta;
type Story = StoryObj<typeof Icon>;

const cashSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 400H64a16 16 0 010-32h384a16 16 0 010 32zM416 448H96a16 16 0 010-32h320a16 16 0 010 32zM32 272H16v48a32 32 0 0032 32h48v-16a64.07 64.07 0 00-64-64z"/><path d="M480 240h16v-64h-16a96.11 96.11 0 01-96-96V64H128v16a96.11 96.11 0 01-96 96H16v64h16a96.11 96.11 0 0196 96v16h256v-16a96.11 96.11 0 0196-96zm-224 64a96 96 0 1196-96 96.11 96.11 0 01-96 96z"/><circle cx="256" cy="208" r="64"/><path d="M416 336v16h48a32 32 0 0032-32v-48h-16a64.07 64.07 0 00-64 64zM480 144h16V96a32 32 0 00-32-32h-48v16a64.07 64.07 0 0064 64zM96 80V64H48a32 32 0 00-32 32v48h16a64.07 64.07 0 0064-64z"/></svg>';

export const Default: Story = {
  args: {
    svgContent: cashSvg,
  },
  render: (args) => <Icon {...args} />,
};

export const CustomColor: Story = {
  render: () => <Icon svgContent={cashSvg} _color="#ff5577" />,
};

export const Sizes: Story = {
  render: () => (
    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
      <Stack direction={Direction.Vertical}>
        <Icon variant="small" svgContent={cashSvg} />
        <Text variant="note">small</Text>
      </Stack>
      <Stack direction={Direction.Vertical}>
        <Icon svgContent={cashSvg} />
        <Text variant="note">default</Text>
      </Stack>
      <Stack direction={Direction.Vertical}>
        <Icon variant="large" svgContent={cashSvg} />
        <Text variant="note">large</Text>
      </Stack>
      <Stack direction={Direction.Vertical}>
        <Icon variant="extraLarge" svgContent={cashSvg} />
        <Text variant="note">extraLarge</Text>
      </Stack>
    </Stack>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <Text>
      Save money <Icon svgContent={cashSvg} /> with our deals
    </Text>
  ),
};
