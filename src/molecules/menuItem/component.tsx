import React from 'react';

import { defaultMoleculeProps, IMoleculeProps } from '../moleculeProps';

interface IMenuItemTheme {
}

export interface IMenuItemProps extends IMoleculeProps<IMenuItemTheme> {
  itemKey: string;
  itemText?: string;
  itemTextVariant?: string;
  itemIconId?: string;
  itemIconVariant?: string;
  onClicked?(itemKey: string): void;
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const MenuItem = (props: IMenuItemProps): React.ReactElement | null => {
  return null;
};

MenuItem.displayName = 'MenuItem';
MenuItem.defaultProps = {
  ...defaultMoleculeProps,
};
