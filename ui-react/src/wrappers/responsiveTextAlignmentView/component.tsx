import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IWrapperProps, defaultWrapperProps } from '../wrapperProps';
import { TextAlignment, IDimensionGuide } from '../../subatoms';
import { useDimensions } from '../../theming';
import { ResponsiveField, CssConverter, fieldToResponsiveCss } from '../../util';

const getAlignmentCss: CssConverter<TextAlignment> = (field: TextAlignment): string => {
  return `text-align: ${field};`;
}

interface IStyledResponsiveTextAlignmentViewProps extends IWrapperProps {
  theme: IDimensionGuide;
  alignment: ResponsiveField<TextAlignment>;
}

const withResponsiveTextAlignmentView = (Component: React.ComponentType<IStyledResponsiveTextAlignmentViewProps>): React.ComponentType => styled(Component)<IStyledResponsiveTextAlignmentViewProps>`
  ${(props: IStyledResponsiveTextAlignmentViewProps): string => fieldToResponsiveCss(props.alignment, props.theme, getAlignmentCss)};
`;

const StyledResponsiveTextAlignmentView = withResponsiveTextAlignmentView((props: IStyledResponsiveTextAlignmentViewProps): React.ReactElement => {
  const children = React.Children.toArray(props.children);
  const child = children.length > 0 ? children[0] : <div />;
  return React.cloneElement(child, { className: getClassName(props.className, child.props.className) });
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

ResponsiveTextAlignmentView.defaultProps = {
  ...defaultWrapperProps,
  alignment: TextAlignment.Start,
};
