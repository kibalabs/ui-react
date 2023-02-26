import React from 'react';

import ReactDOM from 'react-dom';

import { App } from './app';

const renderedPath = window.KIBA_RENDERED_PATH;
const pageData = window.KIBA_PAGE_DATA;

if (typeof document !== 'undefined') {
  const target = document.getElementById('root');
  const renderMethod = target.hasChildNodes() && window.location.pathname === renderedPath ? ReactDOM.hydrate : ReactDOM.render;
  renderMethod(<React.StrictMode><App pageData={pageData} /></React.StrictMode>, target);
}
