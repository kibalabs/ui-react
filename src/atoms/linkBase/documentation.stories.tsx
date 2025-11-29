import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { LinkBase } from '.';
import { KibaIcon } from '../../particles';

const meta: Meta<typeof LinkBase> = {
  component: LinkBase,
  title: 'Atoms/LinkBase',
};

export default meta;
type Story = StoryObj<typeof LinkBase>;

export const Default: Story = {
  render: (args) => (
    <LinkBase {...args}>
      <KibaIcon iconId='ion-bulb' />
    </LinkBase>
  ),
  args: {},
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <LinkBase variant='default'>
        <span>Default</span>
      </LinkBase>
      <LinkBase variant='translucent'>
        <span>Translucent</span>
      </LinkBase>
      <LinkBase variant='card'>
        <span>Card</span>
      </LinkBase>
      <LinkBase variant='image'>
        <span>Image</span>
      </LinkBase>
    </div>
  ),
};

export const WithTarget: Story = {
  render: () => (
    <LinkBase target='https://www.kibalabs.com' label='Visit Kiba Labs'>
      <span>External Link (opens in new tab)</span>
    </LinkBase>
  ),
};

export const InternalLink: Story = {
  render: () => (
    <LinkBase target='/some-page' targetShouldOpenSameTab={true}>
      <span>Internal Link (same tab)</span>
    </LinkBase>
  ),
};

export const AsButton: Story = {
  render: () => (
    <LinkBase onClicked={() => alert('Clicked!')}>
      <span>Click me (button behavior)</span>
    </LinkBase>
  ),
};

export const Disabled: Story = {
  render: () => (
    <LinkBase isEnabled={false}>
      <span>Disabled Link</span>
    </LinkBase>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <LinkBase isFullWidth={true} variant='card'>
      <span>Full Width Link</span>
    </LinkBase>
  ),
};
