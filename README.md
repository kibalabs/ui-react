# UI-React

A React component library for building powerful, consistent applications at scale.

UI-React enforces a strong separation between **theming** and **layout**. This practice enables teams of all sizes to build beautiful, efficient, and consistent UIs quickly.

## Quick Start

### Installation

```bash
npm install @kibalabs/ui-react
```

### Basic Setup

Wrap your app with `KibaApp` and import the CSS:

```tsx
import React from 'react';
import { KibaApp } from '@kibalabs/ui-react';
import '@kibalabs/ui-react/dist/index.css';
import './theme.scss';

export const App = (): React.ReactElement => {
  return (
    <KibaApp>
      {/* Your app content */}
    </KibaApp>
  );
};
```

### Theme Configuration

Create a `theme.scss` file to customize the look and feel:

```scss
@use '@kibalabs/ui-react/styles/reset';
@use '@kibalabs/ui-react/styles/colors';
@use '@kibalabs/ui-react/styles/global';

:root {
  // Colors
  --kiba-color-background: #ffffff;
  --kiba-color-brand-primary: #4b6cb7;
  --kiba-color-text: #333333;

  // Typography
  --kiba-font-family: -apple-system, system-ui, sans-serif;
  --kiba-font-size: 16px;

  // Spacing & Borders
  --kiba-border-radius: 0.5em;
}
```

That's it! You're ready to use UI-React components.

---

## Documentation

See live examples and detailed documentation in [the Storybook](https://ui-react-docs.kibalabs.com).

---

## Core Philosophy

### Separation of Theming and Layout

UI-React is built around one core principle: **component code should only define layout, never appearance**.

In traditional React development, styling is often mixed with component logic:

```tsx
// ❌ Traditional approach - styling mixed with layout
<div style={{ backgroundColor: '#f0f0f0', padding: '16px', borderRadius: '8px' }}>
  <h2 style={{ color: '#333', fontSize: '1.5em' }}>Title</h2>
  <p style={{ color: '#666' }}>Content</p>
</div>
```

With UI-React, components only specify **what** they are, not **how** they look:

```tsx
// ✅ UI-React approach - layout only, theming via variants
<Box variant="card">
  <Stack direction={Direction.Vertical} shouldAddGutters={true}>
    <Text variant="header2">Title</Text>
    <Text>Content</Text>
  </Stack>
</Box>
```

All visual styling is defined globally in SCSS and applied through **variants**.

### Why This Matters

1. **Consistency** - All buttons look like buttons, all cards look like cards. No one-off styles.
2. **Maintainability** - Change your brand color once, it updates everywhere.
3. **Speed** - Building new features is fast when you don't think about styling.
4. **Reusability** - Components work in any context because they don't carry styling baggage.
5. **Team Scaling** - Designers define the theme, developers use it. Clear separation of concerns.

---

## Theming System

UI-React uses CSS Custom Properties (CSS Variables) for all theming. This provides:

- Runtime theme switching (light/dark mode)
- No build step required for theme changes
- Standard CSS cascade and specificity rules
- Easy debugging in browser dev tools

### CSS Variable Naming Convention

All UI-React variables follow the pattern `--kiba-{category}-{name}`:

```scss
// Colors
--kiba-color-background
--kiba-color-brand-primary
--kiba-color-text
--kiba-color-error
--kiba-color-success

// Typography
--kiba-font-family
--kiba-font-size
--kiba-line-height

// Spacing
--kiba-padding
--kiba-padding-narrow
--kiba-padding-wide

// Borders
--kiba-border-radius
--kiba-border-width
```

### Color Variants

For each base color, UI-React automatically generates variants using CSS `color-mix()`:

```scss
--kiba-color-brand-primary          // Base color
--kiba-color-brand-primary-light10  // 10% lighter
--kiba-color-brand-primary-light25  // 25% lighter
--kiba-color-brand-primary-dark10   // 10% darker
--kiba-color-brand-primary-dark25   // 25% darker
--kiba-color-brand-primary-clear25  // 25% transparent
--kiba-color-brand-primary-clear50  // 50% transparent
--kiba-color-brand-primary-clear75  // 75% transparent
```

This means you only need to define base colors, and all variants are available automatically.

### Component Variants

Every component supports a `variant` prop that maps to CSS classes:

```tsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="tertiary">Tertiary Action</Button>
```

Define custom variants in your theme.scss:

```scss
.KibaButton {
  // Default button styles are inherited from ui-react

  &.primary > .KibaButtonFocusFixer {
    background-color: var(--kiba-color-brand-primary);
    color: var(--kiba-color-text-on-brand);
  }

  &.secondary > .KibaButtonFocusFixer {
    background-color: transparent;
    border: 1px solid var(--kiba-color-brand-primary);
    color: var(--kiba-color-brand-primary);
  }

  &.destructive > .KibaButtonFocusFixer {
    background-color: var(--kiba-color-error);
    color: white;
  }
}
```

### Multi-Part Variants

Variants can be combined using hyphens:

```tsx
<Button variant="primary-large">Large Primary Button</Button>
<Text variant="header1-bold">Bold Header</Text>
<Box variant="card-bordered-padded">Styled Card</Box>
```

Each part becomes a separate CSS class, so `primary-large` applies both `.primary` and `.large`.

---

## CSS Layers

UI-React uses CSS `@layer` to organize styles with predictable specificity:

```scss
@layer kiba-reset, kiba-structure, kiba-theme;
```

1. **kiba-reset** - CSS reset and normalization
2. **kiba-structure** - Component structure (display, flex, positioning)
3. **kiba-theme** - Visual styling (colors, borders, shadows)

This ensures your theme overrides always take precedence without needing `!important`.

---

## Component Architecture

### Particles

The lowest-level building blocks. Pure visual elements with no semantic meaning:

- `Box` - A container with optional styling
- `Text` - Styled text content
- `Icon` / `KibaIcon` - Icon display
- `Image` / `Video` / `Media` - Media elements
- `Divider` - Visual separator
- `Spacing` - Whitespace control

### Atoms

Interactive elements that handle user input:

- `Button` / `IconButton` - Clickable actions
- `Link` / `LinkBase` - Navigation
- `Checkbox` / `Switch` - Boolean inputs
- `InputWrapper` - Form field wrapper
- `Dialog` - Modal overlays
- And more...

### Molecules

Composed components for common patterns:

- `Form` - Form container with loading states
- `SingleLineInput` / `MultiLineInput` - Text inputs
- `OptionSelect` - Dropdown selection
- `TabBar` - Navigation tabs
- `Markdown` / `MarkdownText` - Rendered markdown
- And more...

### Layouts

Components that control arrangement of children:

- `Stack` - Flexbox-based linear layout
- `Grid` - CSS Grid layout
- `LayerContainer` - Stacked layers (z-axis)
- `Container` - Max-width wrapper

### Wrappers

Components that modify their children without adding DOM elements:

- `BackgroundView` - Adds background styling
- `ColorSettingView` - Overrides color context
- `PaddingView` - Adds padding
- `HidingView` - Conditional visibility
- `ResponsiveHidingView` - Breakpoint-based visibility

---

## Responsive Design

### Responsive Props

Many components accept responsive prop objects:

```tsx
<Stack
  direction={Direction.Vertical}
  directionResponsive={{ medium: Direction.Horizontal }}
>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>
```

This stacks vertically on mobile, horizontally on medium+ screens.

### Screen Size Breakpoints

```
Base:       0px+
Small:      576px+
Medium:     768px+
Large:      992px+
ExtraLarge: 1200px+
```

### ResponsiveHidingView

Control visibility at different breakpoints:

```tsx
<ResponsiveHidingView hiddenBelow={ScreenSize.Medium}>
  <Text>Only visible on tablets and up</Text>
</ResponsiveHidingView>

<ResponsiveHidingView hiddenAbove={ScreenSize.Medium}>
  <Text>Only visible on mobile</Text>
</ResponsiveHidingView>
```

---

## Example Usage

Here's a real-world example showing the separation of layout and theming:

```tsx
import React from 'react';
import { Box, Text, Stack, Direction, KibaIcon, Alignment, Spacing } from '@kibalabs/ui-react';

interface IMetaItemProps {
  isChecked: boolean;
  text: string;
}

const MetaItem = (props: IMetaItemProps): React.ReactElement => {
  return (
    <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} shouldAddGutters={true}>
      <KibaIcon
        variant="small"
        iconId={props.isChecked ? 'ion-checkmark-circle-outline' : 'ion-close-circle-outline'}
      />
      <Text variant="small">{props.text}</Text>
    </Stack>
  );
};

interface ICardProps {
  title: string;
  items: Array<{ text: string; isChecked: boolean }>;
}

export const MetaCard = (props: ICardProps): React.ReactElement => {
  return (
    <Box variant="card">
      <Stack direction={Direction.Vertical} shouldAddGutters={true}>
        <Text variant="header3">{props.title}</Text>
        {props.items.map((item, index) => (
          <MetaItem key={index} text={item.text} isChecked={item.isChecked} />
        ))}
      </Stack>
    </Box>
  );
};
```

Notice:
- **No colors, spacing values, or visual styles in the component code**
- Layout is explicit via `Stack` and `Direction`
- Appearance is controlled entirely through variants (`card`, `header3`, `small`)
- The component is completely reusable across any theme

---

## Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Install dependencies
npm install

# Start development mode with hot reloading
npm run start-dev

# Start Storybook documentation
npm run docs
```

### Building

```bash
# Build the library
make build

# Run linting
make lint-fix

# Run type checking
make type-check
```

### Using Local Version in Another Project

```bash
# In ui-react directory
npm link

# In your project directory
npm link @kibalabs/ui-react
```

---

## Support

UI-React is primarily maintained by [@krishan711](https://twitter.com/krishan711).

For help with contributing or using UI-React in your project, feel free to reach out!

---

## Projects Using UI-React

- **[everypage](https://www.everypagehq.com)** - Website builder built as a thin layer on UI-React
- **[everysize](https://everysize-app.kibalabs.com)** ([source](https://github.com/kibalabs/everysize-app)) - Multi-resolution website testing tool
- **[Appage](https://www.appage.io)** - Mobile app landing page builder

---

## License

MIT
