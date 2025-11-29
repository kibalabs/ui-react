import type { Preview } from '@storybook/react-vite';
import '../src/styles/reset.scss';
import '../src/styles/colors.scss';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
