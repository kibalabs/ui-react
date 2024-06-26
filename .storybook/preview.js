import React from 'react';
import { buildTheme, resetCss, GlobalCss, ThemeProvider } from '../src';

const theme = buildTheme({
  colors: {
    brandPrimary: '#4b6cb7',
    brandSecondary: '#182848',
  },
  boxes: {
    borderColored: {
      "border-color": '$colors.brandPrimaryClear20',
      "border-width": '2px'
    }
  },
  texts: {
    imageCaption: {
      color: '$colors.textLight80',
      "font-size": '0.85rem'
    }
  },
  prettyTexts: {
    fancy: {
      normal: {
        strong: {
          text: {
            color: '$colors.brandPrimary',
          },
        },
      },
    },
  },
});

const preview = {
  // parameters: {
  //   // actions: {
  //   //   argTypesRegex: '^on[A-Z].*',
  //   // },
  //   // previewTabs: {
  //   //   canvas: {
  //   //     hidden: true,
  //   //   },
  //   // },
  //   options: {
  //     storySort: {
  //       method: 'alphabetical',
  //   //     order: ['Introduction', ['Welcome', 'Theming Goals', 'Architecture'], 'Particles', ['Colors', 'Dimensions', 'Fonts'], 'Atoms', 'Molecules', 'Wrappers'],
  //     },
  //   },
  // },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalCss
          theme={theme}
          resetCss={resetCss}
        />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
