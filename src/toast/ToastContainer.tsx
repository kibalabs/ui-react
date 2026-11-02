import React from 'react';

import { Toaster } from 'react-hot-toast';
// NOTE(krishan711): the css is not being exported to the dist so either need to fix that
// or figure out a nicer way to structure the animations and get that into the theme or similar
// import './toasts.css';

export function ToastContainer(): React.ReactElement {
  // const dimensions = useDimensions();
  return (
    <Toaster
      containerClassName='KibaToastContainer'
      position='top-right'
      reverseOrder={false}
      // gutter={dimensions.padding}
      containerStyle={{}}
    />
  );
}
