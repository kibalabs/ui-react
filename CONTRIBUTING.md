# Contributing to UI-React

👋 Thanks for your interest in contributing!

## Development Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Getting Started

```bash
# Install dependencies
make install

# Start development mode with hot reloading
make start-dev

# Start Storybook documentation
make start-docs
```

## Development Commands

**Always use Makefile commands** rather than running npm/npx directly:

| Command | Description |
|---------|-------------|
| `make start-dev` | Start development mode with hot reloading |
| `make start-docs` | Start Storybook documentation server |
| `make build` | Build the library for production |
| `make lint-fix` | Run linting and auto-fix issues |
| `make type-check` | Run TypeScript type checking |

## Component Architecture

### Component Categories

1. **Particles** - Lowest-level building blocks (Box, Text, Icon, etc.)
2. **Atoms** - Interactive elements (Button, Checkbox, Link, etc.)
3. **Molecules** - Composed components (Form, SingleLineInput, TabBar, etc.)
4. **Layouts** - Arrangement components (Stack, Grid, Container, etc.)
5. **Wrappers** - Style modifiers without DOM elements (BackgroundView, PaddingView, etc.)

### File Structure

Each component follows this structure:

```
src/{category}/{componentName}/
├── component.tsx              # React component
├── styles.scss                # SCSS styles (if needed)
├── index.ts                   # Exports
├── documentation.stories.tsx  # Storybook stories (CSF3)
└── documentation.mdx          # Storybook documentation
```

## CSS Architecture

### CSS Layers

UI-React uses CSS `@layer` for predictable specificity:

```scss
@layer kiba-reset, kiba-structure, kiba-theme;
```

- **kiba-reset** - Browser resets and normalization
- **kiba-structure** - Layout, display, positioning, sizing
- **kiba-theme** - Colors, borders, padding, fonts, shadows

### Layer Guidelines

**Structure layer (`kiba-structure`):**
- `display`, `flex-direction`, `align-items`, `justify-content`
- `position`, `width`, `height`, `overflow`
- `box-sizing`, `flex-grow`, `flex-shrink`

**Theme layer (`kiba-theme`):**
- `background-color`, `color`, `border-*`
- `padding`, `margin`, `border-radius`
- `font-*`, `box-shadow`, `opacity`
- `transition-*`, `cursor`

### CSS Variables

All variables follow the pattern `--kiba-{category}-{name}`:

```scss
// Component sets CSS variables for dynamic values
style={{ '--kiba-box-width': width }}

// SCSS uses them with fallbacks
width: var(--kiba-box-width, 100%);
```

### Variant Classes

Variants are applied as CSS classes. Split multi-part variants:

```tsx
// variant="primary-large" becomes classes: .primary .large
className={getClassName(Component.displayName, ...(variant?.split('-') || []))}
```

```scss
.KibaButton {
  // Default styles on base selector
  background-color: transparent;

  &.primary {
    background-color: var(--kiba-color-brand-primary);
  }

  &.large {
    padding: 1em 2em;
  }
}
```

## Component Patterns

### Props Interface

All components extend `IComponentProps`:

```tsx
import { IComponentProps } from '../../model';

export interface IButtonProps extends IComponentProps {
  text: string;
  onClicked?: () => void;
}
```

`IComponentProps` provides: `id`, `className`, `variant`, `style`

### Style Prop Forwarding

All components must accept and merge the `style` prop:

```tsx
const combinedStyles: React.CSSProperties = {
  ...props.style,  // External styles first
  // ... component's own styles
};
```

### Wrappers

Wrappers must not create wrapper DOM elements. Use `WrapperView`:

```tsx
import { WrapperView } from '../wrappingComponent';

export function MyWrapper(props: IMyWrapperProps): React.ReactElement {
  return (
    <WrapperView
      className={props.className}
      style={props.style}
      wrapperClassName={MyWrapper.displayName}
      wrapperStyle={{ /* computed styles */ }}
    >
      {props.children}
    </WrapperView>
  );
}
```

### SCSS Files

Only create `styles.scss` when a component needs:
- Static CSS class-based styling
- CSS layer definitions
- Variant classes

Wrappers that only pass dynamic styles (like `BackgroundView`) should NOT have SCSS files.

## Storybook Documentation

**Every component must be documented, and every variant must have a story example.**

This ensures:
- Users can see all available options
- Visual regression testing covers all states
- Theming customizations are discoverable

Each component needs two files:

### Stories File (`documentation.stories.tsx`)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '.';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  title: 'Category/MyComponent',
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // default props
  },
};

export const Variant: Story = {
  args: {
    variant: 'primary',
  },
};
```

### MDX File (`documentation.mdx`)

```mdx
import { Meta, Canvas, Controls } from '@storybook/addon-docs/blocks';
import * as Stories from './documentation.stories';

<Meta of={Stories} />

# MyComponent

**MyComponent** is a `category` component that does X.

<Canvas of={Stories.Default} />

<Controls of={Stories.Default} />

## Examples

### Variant Name

<Canvas of={Stories.Variant} />

## Theming

| Class | Description |
|-------|-------------|
| `.KibaMyComponent` | Base component styles |
| `.primary` | Primary variant |
```

## Code Style

- Use TypeScript for all components
- Use `camelCase` for functions and variables
- Use descriptive names over comments
- No newlines within functions
- Avoid comments that are easily inferred from code
- Use named parameters wherever possible

## Pull Requests

Before submitting a PR:

1. Run `make lint-fix` to fix linting issues
2. Run `make type-check` to verify types
3. Run `make build` to ensure production build works
4. Check Storybook with `make start-docs`

## Using Local Version

To test changes in another project:

```bash
# In ui-react directory
npm link

# In your project directory
npm link @kibalabs/ui-react
```

---

Thanks,<br />
Krishan [@krishan711](https://twitter.com/krishan711)
