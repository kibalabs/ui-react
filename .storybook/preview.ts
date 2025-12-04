import type { Preview } from '@storybook/react-vite';
import '../src/styles/reset.scss';
import '../src/styles/defaults.scss';

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
          '*',
        ],
      },
    },
  },
};

export default preview;
