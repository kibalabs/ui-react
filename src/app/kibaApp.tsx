import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps, useInitialization } from '@kibalabs/core-react';

import { GlobalCss } from './globalCss';
import { resetCss } from './resetCss';
import { ITheme, ThemeProvider } from '../theming';

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
  useInitialization((): void => {
    const isRunningOnBrowser = typeof window !== 'undefined';
    if (isRunningOnBrowser) {
      var elements = Array.from(document.getElementsByClassName('no-js'));
      elements.forEach((element: HTMLElement) => {
        element.classList.add('js');
        element.classList.remove('no-js');
      });
    }
  });

  return (
    <ThemeProvider theme={props.theme}>
      <GlobalCss
        theme={props.theme}
        resetCss={resetCss}
      />
      <StyledMainView className='no-js'>
        {props.children}
      </StyledMainView>
    </ThemeProvider>
  );
}
