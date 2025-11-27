import React from 'react';

import { getClassName } from '@kibalabs/core';
import { flattenChildren } from '@kibalabs/core-react';

import { IWrapperProps } from './wrapperProps';

const styleCopier = <P extends IWrapperProps>(props: P): React.ReactElement => {
  const children = flattenChildren(props.children).map((child: (React.ReactElement | string | number)): (React.ReactElement | string | number) => {
    if (React.isValidElement(child)) {
      const existingStyle = (child.props as { style?: React.CSSProperties }).style ?? {};
      // @ts-ignore
      return React.cloneElement(child, {
        className: getClassName(child.props?.className, props.className),
        style: { ...existingStyle, ...props.style },
      });
    }
    return child;
  });
  return <React.Fragment>{ children }</React.Fragment>;
};

export const wrappingComponent = <P extends IWrapperProps>(wrapper: ((component: React.ComponentType<P>) => React.ComponentType<P>)): React.ComponentType<P> => {
  return wrapper(styleCopier);
};

// export const wrappingComponent = function <P extends IWrapperProps>(component: React.ComponentType<P>, getCss: ((props: P) => string)): React.ComponentType<P> {
//   const styledComponent = styled(component)`
//     ${(props: P): string => getCss(props)};
//   `;
//   return styledComponent(styleCopier);
// }
