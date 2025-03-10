import React from 'react';

import { getClassName } from '@kibalabs/core';
// import { flattenChildren } from '@kibalabs/core-react';
import { isFragment } from 'react-is';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReactChild = (string | number | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>);

// https://github.com/grrowl/react-keyed-flatten-children
export const flattenChildren = (children: React.ReactNode, depth = 0, keys: (string | number)[] = [], shouldRemoveEmptyStrings = true): (React.ReactElement | string | number)[] => {
  console.log('flattenChildren', children);
  return React.Children.toArray(children).reduce((acc: ReactChild[], node: React.ReactNode, nodeIndex: number) => {
    if (isFragment(node)) {
      // @ts-expect-error
      acc.push(...flattenChildren((node as unknown as typeof React.Fragment).props.children, depth + 1, keys.concat(node.key || nodeIndex)));
    } else if (React.isValidElement(node)) {
      acc.push(React.cloneElement(node, { key: keys.concat(String(node.key)).join('.') }));
    } else if (typeof node === 'number') {
      acc.push(node);
    } else if (typeof node === 'string' && (node || !shouldRemoveEmptyStrings)) {
      acc.push(node);
    }
    return acc;
  }, []);
};

const styleCopier = <P extends IWrapperProps>(props: P): React.ReactElement => {
  console.log('styleCopier', props);
  const flattenedChildren = flattenChildren(props.children);
  console.log('flattenedChildren', flattenedChildren);
  const children = flattenedChildren.map((child: (React.ReactElement | string | number)): (React.ReactElement | string | number) => {
    if (React.isValidElement(child)) {
      // @ts-ignore
      return React.cloneElement(child, { className: getClassName(child.props?.className, props.className) });
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
