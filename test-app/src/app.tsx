import React from 'react';

import { IRoute, Router } from '@kibalabs/core-react';
import { Head, IHeadRootProviderProps, KibaApp } from '@kibalabs/ui-react';

import { HomePage } from './pages/HomePage';
import { buildAppTheme } from './theme';

const theme = buildAppTheme();

export interface IAppProps extends IHeadRootProviderProps {
  staticPath?: string;
}

export const App = (props: IAppProps): React.ReactElement => {
  const routes: IRoute<{}>[] = [
    { path: '/',
      page: HomePage },
  ];

  return (
    <KibaApp theme={theme} setHead={props.setHead} isFullPageApp={true}>
      <Head headId='app'>
        <title>GM ☀️</title>
      </Head>
      <Router staticPath={props.staticPath} routes={routes} />
    </KibaApp>
  );
};
