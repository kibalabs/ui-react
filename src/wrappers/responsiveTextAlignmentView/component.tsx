import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IWrapperProps, defaultWrapperProps } from '../wrapperProps';
import { TextAlignment, IDimensionGuide } from '../../particles';
import { useDimensions } from '../../theming';
import { ResponsiveField, CssConverter, fieldToResponsiveCss } from '../../util';
import { wrappingComponent } from '../wrappingComponent';

const getAlignmentCss: CssConverter<TextAlignment> = (field: TextAlignment): string => {
  return `text-align: ${field};`;
}

interface IStyledResponsiveTextAlignmentViewProps extends IWrapperProps {
  theme: IDimensionGuide;
  alignment: ResponsiveField<TextAlignment>;
}

const StyledResponsiveTextAlignmentView = wrappingComponent((component: React.ComponentType<IStyledResponsiveTextAlignmentViewProps>): React.ComponentType<IStyledResponsiveTextAlignmentViewProps> => {
  return styled(component)<IStyledResponsiveTextAlignmentViewProps>`
    ${(props: IStyledResponsiveTextAlignmentViewProps): string => fieldToResponsiveCss(props.alignment, props.theme, getAlignmentCss)};
  `
});

export interface IResponsiveTextAlignmentViewProps extends IWrapperProps {
  theme?: IDimensionGuide;
  alignment: TextAlignment;
  alignmentResponsive?: ResponsiveField<TextAlignment>;
}

export const ResponsiveTextAlignmentView = (props: IResponsiveTextAlignmentViewProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  return (
    <StyledResponsiveTextAlignmentView
      className={getClassName(ResponsiveTextAlignmentView.displayName, props.className)}
      theme={theme}
      alignment={{base: props.alignment, ...props.alignmentResponsive}}
    >
      {props.children}
    </StyledResponsiveTextAlignmentView>
  );
};

ResponsiveTextAlignmentView.displayName = 'ResponsiveTextAlignmentView';
ResponsiveTextAlignmentView.defaultProps = {
  ...defaultWrapperProps,
  alignment: TextAlignment.Left,
};
