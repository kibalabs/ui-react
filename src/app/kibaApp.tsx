import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps, useInitialization } from '@kibalabs/core-react';

import { GlobalCss } from './globalCss';
import { resetCss } from './resetCss';
import { ITheme, ThemeProvider } from '../theming';
import { getIsRunningOnBrowser } from '../util';

import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

interface IKibaAppProps extends IMultiAnyChildProps {
  theme: ITheme;
}

interface IStyledMainViewProps extends IMultiAnyChildProps {
  className: string;
}

const withMain = (Component: React.ComponentType<IStyledMainViewProps>): React.ComponentType => styled(Component)<IStyledMainViewProps>`
  min-height: 100vh;
`;

const StyledMainView = withMain((props: IStyledMainViewProps): React.ReactElement => {
  const children = React.Children.count(props.children) > 0 ? props.children : [<div />];
  return React.Children.map(children, ((child: React.ReactElement) => child && React.cloneElement(child, { className: getClassName(props.className, child.props.className) })))
});

export const KibaApp = (props: IKibaAppProps): React.ReactElement => {
  // NOTE(krish): the default is false because if this is rehydrating it would be false on the server and needs to match.
  // it could possibly be moved to a prop so there is no weird behavior when not SSR-ed
  const [isRunningOnBrowser, setIsRunningOnBrowser] = React.useState<boolean>(false);

  useInitialization((): void => {
    setIsRunningOnBrowser(getIsRunningOnBrowser());
  });

  return (
    <ThemeProvider theme={props.theme}>
      <GlobalCss
        theme={props.theme}
        resetCss={resetCss}
      />
      <StyledMainView className={getClassName(isRunningOnBrowser ? 'js' : 'no-js')}>
        {props.children}
      </StyledMainView>
    </ThemeProvider>
  );
}
