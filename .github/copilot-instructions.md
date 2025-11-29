# UI-React Development Guide

This is a React component library. Read these files for context:

- `README.md` - Library overview, theming system, component usage
- `CONTRIBUTING.md` - Development patterns, CSS architecture, component structure

## Key Rules

1. **Always use Makefile commands** - Use `make build`, `make lint-fix`, `make start-docs`, etc.
2. **CSS Layers** - Structure styles go in `@layer kiba-structure`, theme styles in `@layer kiba-theme`
3. **CSS Variables** - Use `--kiba-*` naming convention with fallbacks
4. **Component Props** - Extend `IComponentProps` from `src/model`
5. **Style Forwarding** - All components must accept and merge `style` prop
6. **Wrappers** - Use `WrapperView` to avoid creating wrapper DOM elements
7. **Storybook** - Every component needs `documentation.stories.tsx` (CSF3) + `documentation.mdx`

## Component Categories

- `src/particles/` - Basic building blocks (Box, Text, Icon)
- `src/atoms/` - Interactive elements (Button, Checkbox, Link)
- `src/molecules/` - Composed components (Form, SingleLineInput)
- `src/layouts/` - Arrangement components (Stack, Grid)
- `src/wrappers/` - Style modifiers (BackgroundView, PaddingView)

## File Structure

```
src/{category}/{componentName}/
├── component.tsx              # React component
├── styles.scss                # SCSS styles (if needed)
├── index.ts                   # Exports
├── documentation.stories.tsx  # Storybook stories
└── documentation.mdx          # Documentation
```

## Before Finishing

1. Run `make lint-fix` and `make type-check`
2. Run `make build`
3. Test in Storybook with `make start-docs`
