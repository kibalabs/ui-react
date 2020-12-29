import React from 'react';
import { getClassName } from '@kibalabs/core';
import { flattenChildren } from '@kibalabs/core-react';

import { IWrapperProps } from './wrapperProps';

const styleCopier = function <P extends IWrapperProps>(props: P): React.ReactElement {
  return (
    <React.Fragment>
      {flattenChildren(props.children).map((child: React.ReactChild): React.ReactChild => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { className: getClassName(props.className, child.props?.className) })
        }
        return child;
      })}
    </React.Fragment>
  );
}

export const wrappingComponent = function <P extends IWrapperProps>(wrapper: ((component: React.ComponentType<P>) => React.ComponentType<P>)): React.ComponentType<P> {
  return wrapper(styleCopier);
}

// export const wrappingComponent = function <P extends IWrapperProps>(component: React.ComponentType<P>, getCss: ((props: P) => string)): React.ComponentType<P> {
//   const styledComponent = styled(component)`
//     ${(props: P): string => getCss(props)};
//   `;
//   return styledComponent(styleCopier);
// }