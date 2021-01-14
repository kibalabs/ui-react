# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) with some additions:
- For all changes include one of [PATCH | MINOR | MAJOR] with the scope of the change being made.

## [Unreleased]

### Added
- [MINOR] Created `TitledCollapsibleBox` atom component
- [MINOR] Created `StatefulTitledCollapsibleBox` atom component

### Changed

### Removed

## [0.8.2] - 2021-01-07

### Added
- [PATCH] Added `PaddingSizeProp` (which accepts any string) and use everywhere as a prop instead of `PaddingSize`

### Changed
- [PATCH] Fix `BackgroundView` to not reverse layers in place
- [MINOR] Fix typing for `Grid.Item` and `Stack.Item` children
- [MINOR] Fix typing for `Button`'s `leftIcon` and `rightIcon` props
- [PATCH] Add a default `errorView` to `WebView`

### Removed

## [0.8.1] - 2020-12-23

### Added
- [PATCH] Change `WebView` to be lazyLoadable
- [MINOR] Extract hard-coded aspect-ratio from `WebView` into `aspectRatio` prop
- [PATCH] Added a `MarkdownText` example to storybook

### Changed

### Removed

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

### Removed

## [0.7.4] - 2020-11-22

### Added
- [MINOR] Added `Pill` component
- [MINOR] New 'card' variant for `LinkBase`

### Changed
- [MINOR] Renamed subatoms to particles

### Removed

## [0.7.3] - 2020-11-05

### Added
- [MINOR] Added `shouldShowLoadingSpinner` prop to `WebView`
- [MINOR] Added `maxHeight`, `maxWidth` and `zIndex` props to `Box`
- [MINOR] Added `inheritTextTheme` to `Text` themes + Use this for base `Link` theme

### Changed

### Removed

## [0.7.2] - 2020-10-29

### Added
- [PATCH] Added `TabBar` molecule + `TabBarItem` atom

### Changed

### Removed

## [0.7.1] - 2020-10-20

### Added
- [PATCH] Manually added `displayName` to all components.

### Changed
- [PATCH] Added workflow to build pull requests.

### Removed

## [0.7.0] - 2020-10-06

Initial Commit
