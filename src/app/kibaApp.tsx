import React from 'react';

import { getClassName } from '@kibalabs/core';
import { getIsRunningOnBrowser, IMultiAnyChildProps, useInitialization } from '@kibalabs/core-react';
import styled from 'styled-components';

import { ITheme, ThemeProvider } from '../theming';
import { GlobalCss } from './globalCss';
import { resetCss } from './resetCss';

import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

interface IKibaAppProps extends IMultiAnyChildProps {
  theme: ITheme;
  isRehydrating?: boolean;
}

const StyledMainView = styled.div`
  min-height: 100vh;
  /* NOTE(krishan711): the min-height doesn't propagate to children that have height:100% unless this is here (https://stackoverflow.com/questions/8468066) */
  height: 1px;
`;

export const KibaApp = (props: IKibaAppProps): React.ReactElement => {
  // NOTE(krishan711): the default is false because if this is rehydrating it would be false on the server and needs to match.
  const [isRunningOnBrowser, setIsRunningOnBrowser] = React.useState<boolean>(!props.isRehydrating);

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
};
