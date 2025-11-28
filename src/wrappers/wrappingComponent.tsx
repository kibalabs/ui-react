import React from 'react';

import { getClassName } from '@kibalabs/core';
import { flattenChildren } from '@kibalabs/core-react';

import { IWrapperProps } from './wrapperProps';

interface IStyledChildProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface IWrapperViewProps extends IWrapperProps {
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties | Record<string, string | undefined>;
}

export function WrapperView(props: IWrapperViewProps): React.ReactElement {
  const combinedClassName = getClassName(props.wrapperClassName, props.className);
  const combinedStyle: React.CSSProperties = { ...props.style, ...props.wrapperStyle as React.CSSProperties };
  const children = flattenChildren(props.children).map((child: (React.ReactElement | string | number)): (React.ReactElement | string | number) => {
    if (React.isValidElement<IStyledChildProps>(child)) {
      const existingStyle = child.props.style ?? {};
      return React.cloneElement(child, {
        className: getClassName(child.props.className, combinedClassName),
        style: { ...existingStyle, ...combinedStyle },
      });
    }
    return child;
  });
  return <React.Fragment>{children}</React.Fragment>;
}

const styleCopier = <P extends IWrapperProps>(props: P): React.ReactElement => {
  const children = flattenChildren(props.children).map((child: (React.ReactElement | string | number)): (React.ReactElement | string | number) => {
    if (React.isValidElement<IStyledChildProps>(child)) {
      const existingStyle = child.props.style ?? {};
      return React.cloneElement(child, {
        className: getClassName(child.props.className, props.className),
        style: { ...existingStyle, ...props.style },
      });
    }
    return child;
  });
  return <React.Fragment>{ children }</React.Fragment>;
};

/** @deprecated Use WrapperView component instead */
export const wrappingComponent = <P extends IWrapperProps>(wrapper: ((component: React.ComponentType<P>) => React.ComponentType<P>)): React.ComponentType<P> => {
  return wrapper(styleCopier);
};
