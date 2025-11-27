# CSS Migration Tasks

## Context

We are migrating ui-react components from styled-components to pure CSS/SCSS. The goal is to remove the runtime overhead of styled-components and use CSS layers for proper cascade control.

### Architecture

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
