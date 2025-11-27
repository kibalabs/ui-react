import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core-react';

import './styles.scss';
import { IPrettyTextTheme } from './theme';
import { IComponentProps } from '../../model';
import { getTextTag, TextAlignment, TextTag } from '../../particles/text';

export { PrettyTextThemedStyle } from '../../util/legacyThemeCompat';

export interface IPrettyTextProps extends IComponentProps<IPrettyTextTheme>, IMultiAnyChildProps {
  alignment?: TextAlignment;
  tag?: TextTag;
  style?: React.CSSProperties;
}

export function PrettyText({
  className = '',
  variant = 'default',
  ...props
}: IPrettyTextProps): React.ReactElement {
  const Tag = props.tag || getTextTag(variant);
  return (
    <Tag
      id={props.id}
      className={getClassName(PrettyText.displayName, className, props.alignment, ...(variant?.split('-') || []))}
      style={props.style}
    >
      {props.children}
    </Tag>
  );
}
PrettyText.displayName = 'KibaPrettyText';
