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

The easiest way to setup your code to be ready to use UI-React components is to use the `KibaApp` component and import the SCSS styles:

```tsx
import React from 'react';
import { KibaApp } from '@kibalabs/ui-react';
import './theme.scss'; // Your app's theme file

export const App = (): React.ReactElement => {
  return (
    <KibaApp>
      ...
    </KibaApp>
  );
};
```

Your `theme.scss` should import the base styles from ui-react and define your theme variables:

```scss
@use '@kibalabs/ui-react/styles/reset';
@use '@kibalabs/ui-react/styles/colors' as colors;

:root {
  // Define your base colors
  --kiba-color-background: #ffffff;
  --kiba-color-brand-primary: #4b6cb7;
  --kiba-color-text: #333333;

  // Generate all color variants (light, dark, clear)
  @include colors.generate-color-variants('background');
  @include colors.generate-color-variants('brand-primary');
  @include colors.generate-color-variants('text');

  // Typography
  --kiba-font-family: -apple-system, system-ui, sans-serif;
  --kiba-font-size: 16px;

  // Spacing
  --kiba-padding-base: 0.5em;
}
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

To customize the theming in your application, define CSS custom properties in your theme.scss file. UI-React components use these variables for all styling.

Here's a simple example with custom colors:

```scss
@use '@kibalabs/ui-react/styles/reset';
@use '@kibalabs/ui-react/styles/colors' as colors;

:root {
  --kiba-color-brand-primary: #E56B6F;
  --kiba-color-brand-secondary: #6D597A;
  --kiba-color-background: #000000;
  --kiba-color-text: #ffffff;

  @include colors.generate-color-variants('brand-primary');
  @include colors.generate-color-variants('background');
  @include colors.generate-color-variants('text');
}
```

Here's a more complex example with custom fonts and component variants:

```scss
@use '@kibalabs/ui-react/styles/reset';
@use '@kibalabs/ui-react/styles/colors' as colors;

@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700&display=swap');

:root {
  --kiba-color-brand-primary: #2B59C3;
  --kiba-color-brand-secondary: #1d3557;
  @include colors.generate-color-variants('brand-primary');

  --kiba-font-family: "Montserrat", sans-serif;
}

// Custom button variant with hover shadow
.KibaButton.shadow {
  > .KibaButtonFocusFixer {
    transition: box-shadow 0.2s;
  }
  &:hover > .KibaButtonFocusFixer {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }
}
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
