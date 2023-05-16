import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { IMultiChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IBulletListTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';
import { themeToCss } from '../../util';
import { IBulletTextProps } from '../bulletText';

export const BulletListThemedStyle = (theme: RecursivePartial<IBulletListTheme>): string => `
  ${themeToCss(theme?.normal?.default?.bulletList)};
`;

interface IStyledBulletListProps {
  $theme?: RecursivePartial<IBulletListTheme>;
}

const StyledBulletList = styled.ul<IStyledBulletListProps>`
  &&&& {
    ${(props: IStyledBulletListProps): string => (props.$theme ? BulletListThemedStyle(props.$theme) : '')};
  }
`;

export interface IBulletListProps extends IComponentProps<IBulletListTheme>, IMultiChildProps<IBulletTextProps> {
}

export const BulletList = (props: IBulletListProps): React.ReactElement => {
  return (
    <StyledBulletList
      id={props.id}
      className={getClassName(BulletList.displayName, props.className, ...(props.variant?.split('-') || []))}
      $theme={props.theme}
    >
      {props.children}
    </StyledBulletList>
  );
};

BulletList.displayName = 'KibaBulletList';
BulletList.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
};
