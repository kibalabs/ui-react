# UI-React

UI-React is a React component library for building powerful applications at scale.

(Yes, we need a better name. If you have a suggestion, post here: https://github.com/kibalabs/ui-react/issues/12.)

UI-React promotes strong separation between the theming and layout in your applications. This practice allows efficient, beautiful, consistent UIs to be built quickly by teams of all sizes.

## Documentation

Read all our principles and see live examples of all components in [the storybook documentation](https://ui-react-docs.kibalabs.com).

Here's a good example, [our Button component](https://ui-react-docs.kibalabs.com/?path=/docs/atoms-button--default-story).

## Using UI-React

### Installing

To install UI-React you can simply run:

```
npm install @kibalabs/ui-react styled-components
```

UI-React is built on styled-components and styled-components should be installed as a peer dependency which is why you need to install it yourself with the above command.

### Setup

The easiest way to setup your code to be ready to use UI-React components is to use the `KibaApp` component. It should be used at the topmost level and needs to be passed a theme object like so:

```tsx
import React from 'react';
import { KibaApp, buildTheme } from '@kibalabs/ui-react';

const theme = buildTheme();

export const App = (): React.ReactElement => {
  ...
  return (
    <KibaApp theme={theme}>
      ...
    </KibaApp>
  );
};
```

If you don't want to use the `KibaApp` component (because, for example, it adds CSS to make everything look plain by default), you can instantiate the `ThemeProvider` yourself like this:

```tsx
import React from 'react';
import { ThemeProvider, buildTheme, GlobalCSS } from '@kibalabs/ui-react';

const theme = buildTheme();

export const App = (): React.ReactElement => {
  ...
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalCss theme={theme} />
        ...
      </React.Fragment>
    </ThemeProvider>
  );
};
```

### Example code


Here's some code to show you what it's like to work with (it's taken from the everypage console).

```tsx
import React from 'react';
import { IWebsite } from '@kibalabs/everypage-core'
import { Box, Text, Stack, Direction, KibaIcon, Alignment, Spacing } from '@kibalabs/ui-react'

interface IMetaItemProps {
  isChecked: boolean;
  text: string;
}

const MetaItem = (props: IMetaItemProps): React.ReactElement => {
  return (
    <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} shouldAddGutters={true}>
      <KibaIcon variant='small' iconId={props.isChecked ? 'ion-checkmark-circle-outline' : 'ion-close-circle-outline'} />
      <Text variant='small'>{ props.text }</Text>
    </Stack>
  );
}

interface ISiteMetaCardProps {
  website: IWebsite;
}

export const SiteMetaCard = (props: ISiteMetaCardProps): React.ReactElement => {
  return (
    <Box variant='bordered'>
      <Stack direction={Direction.Vertical}>
        <Text variant='header5'>Metadata</Text>
        <Spacing />
        <MetaItem text='name' isChecked={!!props.website.name} />
        <MetaItem text='description' isChecked={!!props.website.description} />
        <MetaItem text='faviconImageUrl' isChecked={!!props.website.faviconImageUrl} />
        <MetaItem text='socialCardImageUrl' isChecked={!!props.website.socialCardImageUrl} />
      </Stack>
    </Box>
  );
}
```

The code generates this visual:

![Everypage Console Metadata Card](https://wml-images.s3-eu-west-1.amazonaws.com/ep-console-metadata.png)

The important thing to notice here is that this code only includes the **layout** of the components. All the theming is done globally and accessed via **variants** on each of the atomic particles provided by UI-React (e.g. Box, Text and Stack). You can read more about this in our [Theming Goals documentation](https://ui-react-docs.kibalabs.com?path=/docs/introduction-theming-goals--page).

This practice makes new interfaces extremely quick to create and allows your components to be super re-usable.

### Customizing your theme

To customize the theming in your application, you should provide a parameter to the `buildTheme` function. This parameter can contain a subset of an entire theme object (which you can find in buildTheme.ts in this project).

Here's a simple example where just some colors are changed (see particles/colors/theme.ts):

```ts
const theme = buildTheme({
  colors: {
    brandPrimary: '#E56B6F',
    brandSecondary: '#6D597A',
    background: '#000000',
    text: '#ffffff',
    placeholderText: 'rgba(255, 255, 255, 0.5)',
  },
});
```

Here's a more complex example where a custom font is used for all text and all buttons and inputs are changed to have a box shadow when hovered or focussed:

```ts
const theme = buildTheme({
  colors: {
    brandPrimary: '#2B59C3',
    brandSecondary: '#1d3557',
  },
  fonts: {
    main: {
      url: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900&display=swap',
    },
  },
  texts: {
    default: {
      'font-family': "Montserrat, apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif"
    }
  },
  buttons: {
    default: {
      normal: {
        focus: {
          background: {
            "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"
          }
        },
        hover: {
          background: {
          "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"
          }
        }
      }
    }
  },
  inputWrappers: {
    default: {
      normal: {
        focus: {
          background: {
            "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"
          }
        },
        hover: {
          background: {
            "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"
          }
        }
      }
    }
  }
});
```

Hopefully this starts to give you a sense of how powerful the separation of theming and layout can be.

// TODO(krishan711): we need way more documentation on this!

## Contribute
1. Ensure you have installed `node` and `npm`
2. Run `npm install` to install dependencies
3. Run `npm run start-dev`. This will start ui-react for local development with live reloading and give you instructions for using it locally in other packages.
4. Run `npm run docs`. This will start the documentation app (storybook.js) at port 6006 on your local machine.

## Support

UI-React is mostly written by me ([krishan711](https://twitter.com/krishan711)) at the moment. If you want help with contributing or even if you want help using UI-React in your own application just reach out, I'd love to help 🙌.

## Built with UI-React

**[everypage](https://www.everypagehq.com)** - a website (landing page) builder which is actually just a thin, application-specific layer on top of UI-React. If you want to build a landing page just with JSON, check it out!

**[everysize](https://everysize-app.kibalabs.com)** \[[open source](https://github.com/kibalabs/everysize-app)\] - a tool for checking your websites look great at multiple resolutions. This is a real must-have if you're using UI-React to build a responsive product!

**[Appage](https://www.appage.io)** - a small application built on top of everypage. It lets you build a landing page for your mobile app in minutes!
