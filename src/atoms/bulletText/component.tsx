import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { IOptionalSingleChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IBulletTextTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';
import { themeToCss } from '../../util';
import { IBulletListProps } from '../bulletList';

export const BulletTextThemedStyle = (theme: RecursivePartial<IBulletTextTheme>): string => `
  ${themeToCss(theme?.normal?.default?.text)};
  &:before {
    ${themeToCss(theme?.normal?.default?.bullet)};
  }
`;

interface IStyledBulletTextProps {
  $theme?: RecursivePartial<IBulletTextTheme>;
}

const StyledBulletText = styled.li<IStyledBulletTextProps>`
  &:before {
    display: inline-block;
  }
  && {
    ${(props: IStyledBulletTextProps): string => (props.$theme ? BulletTextThemedStyle(props.$theme) : '')};
  }
`;

export interface IBulletTextProps extends IComponentProps<IBulletTextTheme>, IOptionalSingleChildProps<IBulletListProps> {
  text: string;
}

export const BulletText = (props: IBulletTextProps): React.ReactElement => {
  return (
    <StyledBulletText
      id={props.id}
      className={getClassName(BulletText.displayName, props.className, ...(props.variant?.split('-') || []))}
      $theme={props.theme}
    >
      {props.text}
      {props.children}
    </StyledBulletText>
  );
};

BulletText.displayName = 'KibaBulletText';
BulletText.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
};
