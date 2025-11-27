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

---

## Architecture

1. **CSS Layers** (defined in `src/styles/reset.scss`):
   - `kiba-reset` - lowest priority, browser resets
   - `kiba-structure` - structural styles (display, flexbox, positioning)
   - `kiba-theme` - theming styles (colors, borders, padding, fonts)

2. **File Structure** per component:
   - `component.tsx` - React component with className-based styling
   - `styles.scss` - SCSS file with `@layer kiba-structure` and `@layer kiba-theme` blocks
   - `theme.ts` - Theme interface (keep for backwards compat, but unused)

3. **Pattern** (see Box, Button, Text as examples):
   - Remove `styled-components` import and `styled.div` usage
   - Import `./styles.scss` in component
   - Use `getClassName()` to build class names from variant prop
   - Use CSS custom properties (`--kiba-*`) for dynamic values passed via `style` prop
   - Structure styles: `@layer kiba-structure { .KibaComponent { ... } }`
   - Theme styles: `@layer kiba-theme { .KibaComponent { ... } }`
   - Variants become CSS classes: `&.primary`, `&.large`, etc.

4. **Backwards Compatibility**:
   - Keep `theme` prop on components but use `themeToInlineStyles()` for legacy support
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

- [ ] BackgroundView
- [ ] ContainingView
- [ ] ResponsiveContainingView
- [ ] HidingView
- [ ] ResponsiveHidingView
- [ ] PaddingView
- [ ] ColorSettingView
- [ ] ResponsiveTextAlignmentView

---

## Cleanup Tasks

- [ ] Remove `styled-components` from peerDependencies once all components migrated
- [ ] Remove legacy theme building code from `src/theming/cssBuilder.ts`
- [ ] Remove `themeToInlineStyles` and related legacy compat code
- [ ] Update documentation/storybook
