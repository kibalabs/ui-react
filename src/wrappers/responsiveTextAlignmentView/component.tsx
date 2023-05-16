import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { IDimensionGuide, TextAlignment } from '../../particles';
import { useDimensions } from '../../theming';
import { CssConverter, fieldToResponsiveCss, ResponsiveField } from '../../util';
import { defaultWrapperProps, IWrapperProps } from '../wrapperProps';
import { wrappingComponent } from '../wrappingComponent';

const getAlignmentCss: CssConverter<TextAlignment> = (field: TextAlignment): string => {
  return `text-align: ${field};`;
};

interface IStyledResponsiveTextAlignmentViewProps extends IWrapperProps {
  theme: IDimensionGuide;
  alignment: ResponsiveField<TextAlignment>;
}

const StyledResponsiveTextAlignmentView = wrappingComponent((component: React.ComponentType<IStyledResponsiveTextAlignmentViewProps>): React.ComponentType<IStyledResponsiveTextAlignmentViewProps> => {
  return styled(component)<IStyledResponsiveTextAlignmentViewProps>`
    ${(props: IStyledResponsiveTextAlignmentViewProps): string => fieldToResponsiveCss(props.alignment, props.theme, getAlignmentCss)};
  `;
});

export interface IResponsiveTextAlignmentViewProps extends IWrapperProps {
  theme?: IDimensionGuide;
  alignment: TextAlignment;
  alignmentResponsive?: ResponsiveField<TextAlignment>;
}

export const ResponsiveTextAlignmentView = (props: IResponsiveTextAlignmentViewProps): React.ReactElement => {
  const theme = useDimensions(props.theme);
  return (
    <StyledResponsiveTextAlignmentView
      className={getClassName(ResponsiveTextAlignmentView.displayName, props.className)}
      theme={theme}
      alignment={{ base: props.alignment, ...props.alignmentResponsive }}
    >
      {props.children}
    </StyledResponsiveTextAlignmentView>
  );
};

ResponsiveTextAlignmentView.displayName = 'KibaResponsiveTextAlignmentView';
ResponsiveTextAlignmentView.defaultProps = {
  ...defaultWrapperProps,
  alignment: TextAlignment.Left,
};
