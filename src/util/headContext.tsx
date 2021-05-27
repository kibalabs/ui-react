import React from 'react';

import { IMultiAnyChildProps, ISingleAnyChildProps } from '@kibalabs/core-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// NOTE(krishan711): this is just a wrapper around react-helmet-async for now.
// It doesn't support anything bigger but should in the future (e.g. for everypage)
interface IHeadRootProviderProps extends ISingleAnyChildProps {
}

export const HeadRootProvider = (props: IHeadRootProviderProps): React.ReactElement => {
  // NOTE(krishan711): rha only allows a context object to be passed in. For everypage we have
  // 2 things we would want to pass in: document.head or another element (e.g. frame.document.head, ChildCapture)
  // It looks like we'll have to rewrite rha to get this to work the way we want (not easy to achieve wrapped).
  return (
    <HelmetProvider>
      {props.children}
    </HelmetProvider>
  );
};

interface IHeadProps extends IMultiAnyChildProps {
}

export const Head = (props: IHeadProps): React.ReactElement => {
  return (
    <Helmet>
      {props.children}
    </Helmet>
  );
};
