# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) with some additions:
- For all changes include one of [PATCH | MINOR | MAJOR] with the scope of the change being made.

## [Unreleased]

### Added

### Changed
-[MINOR] Fixed `Video` lazy loading
-[MINOR] Make `Link` default style use inherit

### Removed

## [0.9.9] - 2022-06-21

### Changed
-[PATCH] Update `Media` to follow redirects when fetching for content-type
-[PATCH] Added `shouldPassThroughTouches` to `LayerContainer.Layer`
-[PATCH] Added `shouldCaptureTouches` to `Box`

## [0.9.8] - 2022-05-22

### Changed
-[PATCH] Make `Dialog` SSR safe
-[PATCH] Added padding props to `EqualGrid`
-[PATCH] Added `minHeight` and `minWidth` to `Box`

## [0.9.7] - 2022-04-05

### Added
- [MINOR] Added overlay theme to `Box`
- [MINOR] Added `onEnded`, `onPlayed` and `onPaused` to `Video`
- [MINOR] Added `onClictked` to `Link`
- [MINOR] Added `isStatic` to `LayerContainer.Layer` to allow layers to size themselves
- [MINOR] Added `buttonType` to `IconButton`

### Changed
- [PATCH] Update `PrettyText` to render bold and italics inline
- [MINOR] Updated `ListItem` to be un-clickable when disabled
- [MINOR] Updated `Form` to have correct theming
- [MINOR] Updated `Link`, `LinkBase`, `IconButton` and `Button` to not use CoreLink for fragments
- [MINOR] Updated `Button` to wrap text in `span`
- [MINOR] Updated `Button` to use `buttonType` correctly
- [MINOR] Updated `Stack` to inherit `min-height` when `isFullHeight` is true

## [0.9.6] - 2021-12-22

### Added
- [MINOR] Added `background` prop to `KibaApp`
- [MINOR] Created `renderHead` for external head rendering
- [MINOR] updated `Media` to check for url extension and trust if present before checking for content-type

### Changed
- [MINOR] Fixed colors theme creation to calculate text and textOnBrand correctly when background is dark
- [MINOR] Fixed `InputWrapper` to set placeholder on correct elements
- [MINOR] Updated to react-markdown v6
- [MINOR] Fixed `Button`, `IconButton`, `Link` and `LinkBase` to only use `CoreLink` for internal links

## [0.9.5] - 2021-11-21

### Added
- [MINOR] Added `HeadProvider` and `Head` to replace Helmet in apps

### Changed
- [MINOR] Updated `Linkbase` to work with core-routing
- [MINOR] Updated `Link` to work with core-routing
- [MINOR] Updated `Button` to work with core-routing
- [MINOR] Updated `IconButton` to work with core-routing
- [MINOR] Updated `KibaApp` to wrap children with a `HeadProvider`
- [MINOR] Updated `KibaApp` to load theme fonts

## [0.9.4] - 2021-10-11

### Changed
- [MINOR] update `linkbase` to render `<a>` when href is set else render `<button>`
- [MINOR] update `KibaApp` to disable all `body` scrolling on ios if `isFullPageApp`
- [MINOR] update `Media` to check Content-Type of links without extension
- [MINOR] update `Link` to not have a default value for shouldOpenSameTab

### Removed

## [0.9.3] - 2021-09-08

### Changed
- [MINOR] update `Media` to work with local files

## [0.9.2] - 2021-08-10

### Added
- [MINOR] Added `isFullPageApp` to `KibaApp` to force root elements to 100% width and height
- [MINOR] Added `extraGlobalCss` to `KibaApp` to allow manual additions to global CSS

### Changed
- [PATCH] Update `Media` to process urls more accurately (e.g. ignore query params)
- [PATCH] Update `TitledCollapsibleBox` to clip children so borders look nice
- [PATCH] Fix `TitledCollapsibleBox` to only collapse when clicking on the title area

## [0.9.1] - 2021-07-09

### Added
- [MINOR] Added `shouldShrinkBelowContentSize` to `Stack.Item`

### Changed
- [PATCH] Fix `Box` to align children correctly when not full width

## [0.9.0] - 2021-07-06

### Added
- [MINOR] Created `Dialog` atom component
- [MINOR] Created `MessageDialog` molecule component
- [MINOR] Created `List` molecule and `List.Item` atom
- [MINOR] Created `Divider` particle for use in `List`s
- [MINOR] Created `useResponsiveScreenSize` hook to get screen size
- [MINOR] Created `OptionSelect` molecule component

### Changed
- [MINOR] Updated `LayerContainer` wrapper component
- [MINOR] Correct scrollability in `Stack`
- [MINOR] Updated to `Portal` to have offset and placement props
- [MINOR] Updated `Stack` to have `shouldWrapItems` prop to wrap items when it overflows
- [MINOR] Updated `Box` props so that children are optional
- [MINOR] Updated `Box` props to have `title` prop to have a tooltip
- [MINOR] Updated `Grid` and `EqualGrid` to have `defaultGutter` prop to change the gutter size
- [MINOR] Updated `LinkBase` props to have `isFullHeight` prop
- [MINOR] Updated `TabBar` props to have `contentAlignment` prop to control horizontal alignment of tabs
- [MINOR] Updated `InputWrapper` and related component props to have `onClick` event on the component
- [MINOR] Updated `Stack` to have vertical gutters between wrapped items
- [MINOR] Updated `Box` to have `shouldClipContent` prop to clip content wihtin the box
- [MINOR] Updated `Text` to have `lineLimit` prop to truncate text to a specific number of lines
- [MINOR] Updated `Button`, `Link`, `LinkBase` to have `TabIndex` Prop
- [MINOR] Moved colors css to `:root`

## [0.8.4] - 2021-02-06

### Changed
- [MINOR] Updated `ResponsiveContainingView` to have `isCenteredHorizontally` prop to center contents horizontally
- [MINOR] Updated `KibaApp` to have a height so it can have children with `height:100%`

## [0.8.3] - 2021-01-19

### Added
- [MINOR] Created `TitledCollapsibleBox` atom component
- [MINOR] Created `StatefulTitledCollapsibleBox` atom component
- [MINOR] Created `Checkbox` atom component
- [MINOR] Created `MultiLineInput` molecule component

### Changed
- [PATCH] Fixed `Icon` to set color correctly
- [PATCH] Fixed `Markdown` to use un-margined text when embedded in other text (e.g. a <strong> inside a <p>)
- [PATCH] Moved `Markdown` to be a molecule
- [PATCH] Moved `MarkdownText` to be a molecule
- [PATCH] Memoize `Markdown` and `MarkdownText` to prevent expensive re-renders
- [PATCH] Update `Link` to only use inherited text styles with the `inherit` variant

## [0.8.2] - 2021-01-07

### Added
- [PATCH] Added `PaddingSizeProp` (which accepts any string) and use everywhere as a prop instead of `PaddingSize`

### Changed
- [PATCH] Fix `BackgroundView` to not reverse layers in place
- [MINOR] Fix typing for `Grid.Item` and `Stack.Item` children
- [MINOR] Fix typing for `Button`'s `leftIcon` and `rightIcon` props
- [PATCH] Add a default `errorView` to `WebView`

## [0.8.1] - 2020-12-23

### Added
- [PATCH] Change `WebView` to be lazyLoadable
- [MINOR] Extract hard-coded aspect-ratio from `WebView` into `aspectRatio` prop
- [PATCH] Added a `MarkdownText` example to storybook

## [0.8.0] - 2020-12-23

### Added
- [MINOR] Fix `Pill` export
- [MINOR] Add no-js class to main components and change to js if enabled in browser

### Changed
- [MAJOR] Change `Image`, `Video`, `Media` to not be lazy-loadable by default
- [MINOR] Rename crop to cover for fitType in Image
- [MINOR] Update global no-js class to work with SSR by adding `isRehydrating` prop to `KibaApp`
- [MINOR] Update `Image` and `Video` to not populate `data-src` if not lazy-loading
- [PATCH] Update useBuiltTheme to defer resolving values (for SSR on IE11)

## [0.7.4] - 2020-11-22

### Added
- [MINOR] Added `Pill` component
- [MINOR] New 'card' variant for `LinkBase`

### Changed
- [MINOR] Renamed subatoms to particles

## [0.7.3] - 2020-11-05

### Added
- [MINOR] Added `shouldShowLoadingSpinner` prop to `WebView`
- [MINOR] Added `maxHeight`, `maxWidth` and `zIndex` props to `Box`
- [MINOR] Added `inheritTextTheme` to `Text` themes + Use this for base `Link` theme

## [0.7.2] - 2020-10-29

### Added
- [PATCH] Added `TabBar` molecule + `TabBarItem` atom

## [0.7.1] - 2020-10-20

### Added
- [PATCH] Manually added `displayName` to all components.

### Changed
- [PATCH] Added workflow to build pull requests.

## [0.7.0] - 2020-10-06

Initial Commit
