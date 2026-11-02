# @kibalabs/ui-react

Kiba Labs' React component library. Components only define layout; how they look comes from a global theme applied through variants.

Docs and live examples: [ui-react-docs.kibalabs.com](https://ui-react-docs.kibalabs.com)

## Install

```bash
npm install @kibalabs/ui-react @kibalabs/core react react-dom react-router
```

## Setup

```tsx
import { KibaApp } from '@kibalabs/ui-react';
import './theme.scss';

export const App = (): React.ReactElement => (
  <KibaApp>{/* ... */}</KibaApp>
);
```

```scss
// theme.scss
@use '@kibalabs/ui-react/styles.scss';

:root {
  --kiba-color-background: #ffffff;
  --kiba-color-brand-primary: #4b6cb7;
  --kiba-color-text: #333333;
  --kiba-font-family: system-ui, sans-serif;
  --kiba-border-radius: 0.5em;
}
```

Use `@kibalabs/ui-react/styles.css` instead if you don't use scss.

## Entries

| Import | Styles | Needs installed |
| --- | --- | --- |
| `@kibalabs/ui-react` | `styles.scss` / `styles.css` | - |
| `@kibalabs/ui-react/toast` (was `@kibalabs/ui-react-toast`) | `toast/styles.scss` / `toast/styles.css` | `react-hot-toast` |
| `@kibalabs/ui-react/dropzone` (was `@kibalabs/ui-react-dropzone`) | `dropzone/styles.scss` / `dropzone/styles.css` | `react-dropzone` |

Toast and dropzone styles only hold their own rules, so use them on top of the main styles.

## Theming

- **Variables:** everything is themed with CSS variables named `--kiba-{category}-{name}` (e.g. `--kiba-color-brand-primary`, `--kiba-padding`). Each color also gets `-light10/25`, `-dark10/25` and `-clear25/50/75` variants.
- **Variants:** every component takes a `variant` that becomes css classes, and hyphens combine them (`variant="primary-large"` → `.primary.large`). Style them in your theme, e.g. `.KibaButton.primary { ... }`.
- **Layers:** styles are in `@layer kiba-reset, kiba-structure, kiba-theme`, so your theme overrides them without `!important`.

```tsx
<Box variant='card'>
  <Stack direction={Direction.Vertical} shouldAddGutters={true}>
    <Text variant='header2'>Title</Text>
    <Button variant='primary' text='Go' onClicked={onGoClicked} />
  </Stack>
</Box>
```

## Development

```bash
make install
make lint-check
make type-check
make build
make start-docs  # storybook
```
