import React from 'react';

import { KibaIcon } from '.';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <KibaIcon {...args} />;
}

export default {
  component: KibaIcon,
  title: 'Particles/KibaIcon',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    iconId: 'ion-cash',
  },
};

export const IonIcon = {
  render: () => <KibaIcon iconId='ion-cash' />,
  name: 'Ion Icon',
};

export const MaterialIcon = {
  render: () => <KibaIcon iconId='mui-account-box' />,
  name: 'Material Icon',
};

export const FeatherIcon = {
  render: () => <KibaIcon iconId='feather-airplay' />,
  name: 'Feather Icon',
};

export const BootstrapIcon = {
  render: () => <KibaIcon iconId='bs-basket2' />,
  name: 'Bootstrap Icon',
};

export const RemixIcon = {
  render: () => <KibaIcon iconId='remix-honour' />,
  name: 'Remix Icon',
};

export const SmallIcon = {
  render: () => <KibaIcon variant='small' iconId='remix-honour' />,
  name: 'Small Icon',
};

export const LargeIcon = {
  render: () => <KibaIcon variant='large' iconId='remix-honour' />,
  name: 'Large Icon',
};
