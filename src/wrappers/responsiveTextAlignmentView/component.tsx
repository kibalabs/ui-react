import React from 'react';

import { getClassName } from '@kibalabs/core';

import './styles.scss';
import { TextAlignment } from '../../particles';
import { ResponsiveField } from '../../util';
import { IWrapperProps } from '../wrapperProps';
import { WrapperView } from '../wrappingComponent';

export interface IResponsiveTextAlignmentViewProps extends IWrapperProps {
  alignment: TextAlignment;
  alignmentResponsive?: ResponsiveField<TextAlignment>;
}

export function ResponsiveTextAlignmentView(props: IResponsiveTextAlignmentViewProps): React.ReactElement {
  const alignmentField: ResponsiveField<TextAlignment> = { base: props.alignment, ...props.alignmentResponsive };
  const wrapperStyle: React.CSSProperties & Record<string, string> = {
    '--rtav-text-align-base': alignmentField.base,
    '--rtav-text-align-small': alignmentField.small,
    '--rtav-text-align-medium': alignmentField.medium,
    '--rtav-text-align-large': alignmentField.large,
    '--rtav-text-align-extra-large': alignmentField.extraLarge,
  } as React.CSSProperties;
  return (
    <WrapperView
      className={props.className}
      style={props.style}
      wrapperClassName={getClassName(ResponsiveTextAlignmentView.displayName)}
      wrapperStyle={wrapperStyle}
    >
      {props.children}
    </WrapperView>
  );
}
ResponsiveTextAlignmentView.displayName = 'KibaResponsiveTextAlignmentView';
