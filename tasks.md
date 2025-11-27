# CSS Migration Tasks

## Context

We are migrating ui-react components from styled-components to pure CSS/SCSS. The goal is to remove the runtime overhead of styled-components and use CSS layers for proper cascade control.

---

## Migration Rules

### 1. Components Must Accept and Forward `style` Prop

All components must accept a `style?: React.CSSProperties` prop and merge it with any internal styles. This is required because `Stack.Item` (and potentially other wrappers) use `React.cloneElement` to pass flex styles to children.

```tsx
// In the interface:
style?: React.CSSProperties;

// In the component:
const combinedStyles: React.CSSProperties = {
  ...props.style,  // External styles first
  // ... component's own styles
};
```

### 2. Wrappers Must Not Create Wrapper Elements

Wrappers should pass through to their children without creating additional DOM elements. Use `React.cloneElement` to add className/style to children, not wrapper divs.

```tsx
// ❌ Wrong - creates wrapper element
return <div className="wrapper">{children}</div>;

// ✅ Correct - clones props onto children
return React.cloneElement(child, {
  className: getClassName(child.props.className, 'added-class'),
  style: { ...itemStyle, ...child.props.style },
});
```

### 3. CSS Custom Properties for Dynamic Values

Use CSS custom properties (set via `style` prop) for values that vary per-instance. Static variants use CSS classes.

```tsx
// Component sets CSS variables
style={{ '--kiba-box-width': width }}

// SCSS uses them with fallbacks
width: var(--kiba-box-width, 100%);
```

### 4. CSS Layer Order

Always use the correct layer for styles:
- `@layer kiba-structure` - Layout, display, positioning, sizing (NO colors, borders, padding)
- `@layer kiba-theme` - Colors, borders, padding, fonts, shadows, transitions

### 5. Variant Classes

Split variant string and apply each part as a class. Use `&.variantName` in SCSS.

```tsx
className={getClassName(Component.displayName, ...(variant?.split('-') || []))}
```

```scss
&.primary { ... }
&.large { ... }
&.primary.large { ... }  // Combination
```

### 6. Default Variant - DO NOT Use `.default` Class

**CRITICAL**: The "default" variant should be applied directly to the base component selector, NOT as a `.default` class. This ensures:
- Default styles always apply
- App overrides to the base selector affect all variants
- Other variants only need to specify their differences

```scss
// ✅ Correct - default styles on base selector
.KibaButton {
  background-color: transparent;
  color: $color-brand-primary;

  &.primary {
    background-color: $color-brand-primary;
    color: $color-text-on-brand;
  }
}

// ❌ Wrong - default as a separate class
.KibaButton {
  &.default {
    background-color: transparent;  // Won't inherit to other variants!
  }
}
```

### 7. Theme Styles vs Structure Styles

Be very clear about what goes where:

**Structure (`kiba-structure`):**
- `display`, `flex-direction`, `align-items`, `justify-content`
- `position`, `width`, `height`, `overflow`
- `box-sizing`, `flex-grow`, `flex-shrink`

**Theme (`kiba-theme`):**
- `background-color`, `color`, `border-*`
- `padding`, `margin`, `border-radius`
- `font-*`, `box-shadow`, `opacity`
- `transition-*`, `cursor`

### 8. Default Values

- Use CSS fallbacks for defaults: `var(--kiba-box-width, 100%)`
- Don't rely on undefined CSS variables - always provide fallback
- Component props should have sensible defaults

### 9. No Wrapper Divs for Stack.Item

`Stack.Item` must NOT wrap children in a div. It clones flex properties onto children directly. This means all potential Stack children must accept `style` prop.

### 10. Don't Set Explicit Heights That Break Flex Stretch

When using flex layouts (Grid, Stack), avoid setting explicit `height: auto` on children when `align-items: stretch` is desired.

```tsx
// ❌ Wrong - explicitly sets height, breaks stretch
'--kiba-grid-item-height': child.props.isFullHeight ? '100%' : 'auto',

// ✅ Correct - only set when explicitly requested
...(child.props.isFullHeight ? { '--kiba-grid-item-height': '100%' } : {}),
```

### 11. Base Interface: IComponentProps

All migrated components should extend `IComponentProps` from `../../model`. This interface provides:
- `id?: string`
- `className?: string`
- `variant?: string`
- `style?: React.CSSProperties`

```tsx
import { IComponentProps } from '../../model';

export interface IButtonProps extends IComponentProps {
  text: string;
  // ... component-specific props only
}
```

For components that still need the legacy `theme` prop during migration, use `IComponentPropsCompat<ThemeType>` which extends `IComponentProps` with a deprecated `theme` prop.

### 12. Removing Theme Files

When a component is fully migrated to CSS (no longer uses `props.theme`):

1. **Delete `theme.ts`** - The theme interface is no longer needed
2. **Delete `buildTheme.ts`** - No longer building JS theme objects
3. **Update `index.ts`** - Remove `export * from './theme'`
4. **Keep `ThemedStyle` export** - For backwards compat, export empty function from `legacyThemeCompat.ts`:
   ```tsx
   // In component.tsx:
   export { ButtonThemedStyle } from '../../util/legacyThemeCompat';
   ```
5. **Update `themeBuilder.ts`** - Use `{}` for the component's theme entry

### 13. Legacy Theme Compat

The `src/util/legacyThemeCompat.ts` file contains:
- Empty `ThemedStyle` functions for migrated components (return `''`)
- `BoxThemedStyle` and `TextThemedStyle` that still work (particles not fully migrated)
- `themeToInlineStyles()` for components that still support `props.theme`

Components that still use `props.theme` should keep their `theme.ts` file and use `IComponentPropsCompat<IThemeType>`.

### 14. Only Create SCSS Files When Needed

**DO NOT** create `styles.scss` files for components that only use inline styles (via `style` prop). SCSS files are only needed when a component has:
- Static CSS class-based styling
- CSS layer definitions (`@layer kiba-structure`, `@layer kiba-theme`)
- Variant classes

Wrappers that only pass dynamic styles to children (like `BackgroundView`, `ColorSettingView`) should NOT have SCSS files.

### 15. Wrappers Should Use WrapperView

For wrapper components that pass styles/classNames to children without creating DOM elements, use the `WrapperView` component from `wrappingComponent.tsx`:

```tsx
import { WrapperView } from '../wrappingComponent';

export function MyWrapper(props: IMyWrapperProps): React.ReactElement {
  const wrapperStyle = { /* computed styles */ };
  return (
    <WrapperView
      className={props.className}
      style={props.style}
      wrapperClassName={MyWrapper.displayName}
      wrapperStyle={wrapperStyle}
    >
      {props.children}
    </WrapperView>
  );
}
```

`WrapperView` handles:
- Combining `className` (from parent) with `wrapperClassName` (component's own)
- Combining `style` (from parent) with `wrapperStyle` (component's own)
- Cloning these onto children via `React.cloneElement`
- Returning `React.Fragment` (no wrapper div)

---

## Architecture

1. **CSS Layers** (defined in `src/styles/reset.scss`):
   - `kiba-reset` - lowest priority, browser resets
   - `kiba-structure` - structural styles (display, flexbox, positioning)
   - `kiba-theme` - theming styles (colors, borders, padding, fonts)

2. **File Structure** per component:
   - `component.tsx` - React component with className-based styling
   - `styles.scss` - SCSS file with `@layer kiba-structure` and `@layer kiba-theme` blocks
   - `theme.ts` - Theme interface (DELETE when component fully migrated to CSS)
   - `buildTheme.ts` - Theme builder (DELETE when component fully migrated to CSS)
   - `index.ts` - Exports (remove theme export when theme.ts deleted)

3. **Pattern** (see Box, Button, Text as examples):
   - Remove `styled-components` import and `styled.div` usage
   - Import `./styles.scss` in component
   - Use `getClassName()` to build class names from variant prop
   - Use CSS custom properties (`--kiba-*`) for dynamic values passed via `style` prop
   - Structure styles: `@layer kiba-structure { .KibaComponent { ... } }`
   - Theme styles: `@layer kiba-theme { .KibaComponent { ... } }`
   - Variants become CSS classes: `&.primary`, `&.large`, etc.

4. **Backwards Compatibility**:
   - Keep `ThemedStyle` exports via `legacyThemeCompat.ts` (empty functions for migrated components)
   - Keep `IComponentPropsCompat<Theme>` for components still using `props.theme`
   - Apps should migrate to SCSS overrides (see `agent-hack/app/src/theme.scss`)

---

## Particles

- [x] Box
- [x] Text
- [x] Spacing
- [ ] Divider
- [ ] Image
- [ ] Icon
- [ ] KibaIcon
- [ ] LoadingSpinner
- [ ] Pill
- [ ] Video
- [ ] Media
- [ ] Portal

## Atoms

- [x] Button
- [x] SelectableView
- [x] Dialog
- [x] IconButton
- [ ] Link
- [ ] LinkBase
- [ ] Checkbox
- [ ] Switch
- [x] InputWrapper
- [ ] TabBarItem
- [ ] ListItem
- [ ] BulletText
- [ ] BulletList
- [x] CollapsibleBox
- [ ] TitledCollapsibleBox
- [ ] LinePager
- [x] PrettyText
- [ ] ProgressCounterItem
- [ ] WebView

## Molecules

- [ ] Form
- [ ] InputFrame
- [x] SingleLineInput
- [ ] MultiLineInput
- [ ] OptionSelect
- [ ] TabBar
- [ ] Markdown
- [ ] MarkdownText
- [ ] MessageDialog
- [ ] List
- [ ] Carousel
- [ ] ProgressCounter
- [ ] AppDownloadButton

## Layouts

- [x] Stack
- [x] EqualGrid
- [x] Grid
- [x] Container
- [x] LayerContainer

## Wrappers

- [x] BackgroundView
- [x] ContainingView
- [x] ResponsiveContainingView
- [x] HidingView
- [x] ResponsiveHidingView
- [x] PaddingView
- [x] ColorSettingView
- [x] ResponsiveTextAlignmentView

---

## Cleanup Tasks

- [ ] Remove the theme context, everything should use css variables to get the current theme
- [ ] Update all components to not support theme prop
- [ ] Remove `styled-components` from peerDependencies once all components migrated
- [ ] Remove legacy theme building code from `src/theming/cssBuilder.ts`
- [ ] Remove `themeToInlineStyles` and related legacy compat code
- [ ] Update documentation/storybook
