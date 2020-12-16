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
  isRehydrating?: boolean;
}

const StyledMainView = styled.div`
  min-height: 100vh;
`;

export const KibaApp = (props: IKibaAppProps): React.ReactElement => {
  // NOTE(krish): the default is false because if this is rehydrating it would be false on the server and needs to match.
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
}
