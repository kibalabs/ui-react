import React from 'react';

import { LinkBase } from '.';
import { KibaIcon } from '../../particles';

function Template(args) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LinkBase {...args}>
      <KibaIcon iconId='ion-bulb' />
    </LinkBase>
  );
}

export default {
  component: LinkBase,
  title: 'Atoms/LinkBase',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};

export const Translucent = {
  render: () => (
    <LinkBase variant='translucent'>
      <p>I&apos;m a link now</p>
    </LinkBase>
  ),

  name: 'Translucent',
};

export const Image = {
  render: () => (
    <LinkBase variant='image'>
      <img src='https://www.everypagehq.com/20200505212614/assets/everypage-wordmark.svg' alt='cool logo' />
    </LinkBase>
  ),

  name: 'Image',
};

export const Card = {
  render: () => (
    <LinkBase variant='card'>
      <span>hello world</span>
    </LinkBase>
  ),

  name: 'Card',
};

export const LinkWithTarget = {
  render: () => (
    <LinkBase variant='card' target='https://www.everypagehq.com'>
      <span>This is anchored</span>
    </LinkBase>
  ),

  name: 'Link with target',
};

export const LinkWithoutTarget = {
  render: () => (
    <LinkBase variant='card'>
      <span>This is in a button</span>
    </LinkBase>
  ),

  name: 'Link without target',
};
