import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { IMultiChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IBulletListTheme } from './theme';
import { IComponentProps } from '../../model';
import { themeToCss } from '../../util';
import { IBulletTextProps } from '../bulletText';

export const BulletListThemedStyle = (theme: RecursivePartial<IBulletListTheme>): string => `
  ${themeToCss(theme?.normal?.default?.bulletList)};
`;

interface IStyledBulletListProps {
  $theme?: RecursivePartial<IBulletListTheme>;
}

const StyledBulletList = styled.ul<IStyledBulletListProps>`
  counter-reset: list-number;
  list-style-position: outside;
  text-indent: -0.1em;
  display: table;
  &&&& {
    ${(props: IStyledBulletListProps): string => (props.$theme ? BulletListThemedStyle(props.$theme) : '')};
  }
`;

export interface IBulletListProps extends IComponentProps<IBulletListTheme>, IMultiChildProps<IBulletTextProps> {
}

export function BulletList({
  className = '',
  variant = 'default',
  ...props
}: IBulletListProps): React.ReactElement {
  return (
    <StyledBulletList
      id={props.id}
      className={getClassName(BulletList.displayName, className, ...(variant?.split('-') || []))}
      $theme={props.theme}
    >
      {props.children}
    </StyledBulletList>
  );
}
BulletList.displayName = 'KibaBulletList';
