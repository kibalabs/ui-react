import React from 'react';

import type { Preview } from '@storybook/react-vite';

import '../src/styles/reset.scss';
import '../src/styles/defaults.scss';
import { ToastContainer } from '../src/toast';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          ['Welcome', 'Architecture', 'Theming'],
          'Particles',
          'Atoms',
          'Molecules',
          'Layouts',
          'Wrappers',
          'Extras',
          '*',
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <React.Fragment>
        <ToastContainer />
        <Story />
      </React.Fragment>
    ),
  ],
};

export default preview;
