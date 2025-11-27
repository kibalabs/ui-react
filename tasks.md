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
- `@layer kiba-structure` - Layout, display, positioning, sizing
- `@layer kiba-theme` - Colors, borders, padding, fonts, shadows

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

### 6. Default Values

- Use CSS fallbacks for defaults: `var(--kiba-box-width, 100%)`
- Don't rely on undefined CSS variables - always provide fallback
- Component props should have sensible defaults

### 7. No Wrapper Divs for Stack.Item

`Stack.Item` must NOT wrap children in a div. It clones flex properties onto children directly. This means all potential Stack children must accept `style` prop.

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
- [x] Spacing ✅
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
- [x] SelectableView ✅
- [x] Dialog ✅
- [ ] IconButton
- [ ] Link
- [ ] LinkBase
- [ ] Checkbox
- [ ] Switch
- [ ] InputWrapper
- [ ] TabBarItem
- [ ] ListItem
- [ ] BulletText
- [ ] BulletList
- [ ] CollapsibleBox
- [ ] TitledCollapsibleBox
- [ ] LinePager
- [ ] PrettyText
- [ ] ProgressCounterItem
- [ ] WebView

## Molecules

- [ ] Form
- [ ] InputFrame
- [ ] SingleLineInput
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

- [x] Stack ✅
- [ ] EqualGrid
- [ ] Grid
- [ ] Container
- [ ] LayerContainer

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

## App-Specific Priority (agent-hack usage count)

1. Text (1060) ✅
2. Stack (605) ✅
3. Box (266) ✅
4. Spacing (208) ✅
5. Dialog (189) ✅
6. Button (148) ✅
7. KibaIcon (42)
8. Image (42)
9. MarkdownText (34)
10. IconButton (25)
11. Form (25)
12. Link (23)
13. ResponsiveHidingView (22)
14. HidingView (17)
15. LinkBase (16)

---

## Cleanup Tasks

- [ ] Remove `styled-components` from peerDependencies once all components migrated
- [ ] Remove legacy theme building code from `src/theming/cssBuilder.ts`
- [ ] Remove `themeToInlineStyles` and related legacy compat code
- [ ] Update documentation/storybook
