import React from 'react';

import { getClassName, KibaException } from '@kibalabs/core';

import { IMoleculeProps } from '..';
import { LinkBase } from '../../atoms/linkBase';
import { Image } from '../../particles/image';

// NOTE(krishan711): each badge is in its own chunk (they're 7-20kb each) so apps only load the ones they show
const BADGE_LOADERS: Record<string, () => Promise<{ default: string }>> = {
  'android-dark': () => import('./badges/androidDark'),
  'android-dark-clear': () => import('./badges/androidDarkClear'),
  'android-light': () => import('./badges/androidLight'),
  'android-light-clear': () => import('./badges/androidLightClear'),
  'ios-dark': () => import('./badges/iosDark'),
  'ios-dark-clear': () => import('./badges/iosDarkClear'),
  'ios-light': () => import('./badges/iosLight'),
  'ios-light-clear': () => import('./badges/iosLightClear'),
  'mac-dark': () => import('./badges/macDark'),
  'mac-dark-clear': () => import('./badges/macDarkClear'),
  'mac-light': () => import('./badges/macLight'),
  'mac-light-clear': () => import('./badges/macLightClear'),
  'appletv-dark': () => import('./badges/appletvDark'),
  'appletv-dark-clear': () => import('./badges/appletvDarkClear'),
  'appletv-light': () => import('./badges/appletvLight'),
  'appletv-light-clear': () => import('./badges/appletvLightClear'),
};

const loadedBadgeSources = new Map<string, string>();

export interface AppDownloadButtonProps extends IMoleculeProps {
  appId: string;
  appType: 'android' | 'ios' | 'mac' | 'appletv';
  buttonVariant: string;
  isLazyLoadable?: boolean;
  // onClick?(): void;
}

export function AppDownloadButton({
  className = '',
  buttonVariant = 'dark',
  isLazyLoadable = true,
  ...props
}: AppDownloadButtonProps): React.ReactElement {
  if (['dark', 'dark-clear', 'light', 'light-clear'].indexOf(buttonVariant) === -1) {
    console.error(`The buttonVariant was not recognized: ${buttonVariant}`);
  }
  if (['android', 'ios', 'mac', 'appletv'].indexOf(props.appType) === -1) {
    throw new KibaException(`appType not recognized: ${props.appType}`);
  }

  const badgeId = `${props.appType}-${buttonVariant}`;
  const [badgeSource, setBadgeSource] = React.useState<string | null>(loadedBadgeSources.get(badgeId) ?? null);

  React.useEffect((): (() => void) | undefined => {
    const loadedBadgeSource = loadedBadgeSources.get(badgeId);
    if (loadedBadgeSource) {
      setBadgeSource(loadedBadgeSource);
      return undefined;
    }
    setBadgeSource(null);
    const badgeLoader = BADGE_LOADERS[badgeId];
    if (!badgeLoader) {
      return undefined;
    }
    let isCancelled = false;
    badgeLoader().then((badgeModule: { default: string }): void => {
      const source = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(badgeModule.default)}`;
      loadedBadgeSources.set(badgeId, source);
      if (!isCancelled) {
        setBadgeSource(source);
      }
    }).catch((error: unknown): void => {
      console.error(`Failed to load the ${badgeId} badge`, error);
    });
    return (): void => {
      isCancelled = true;
    };
  }, [badgeId]);

  const getAppUrl = (): string => {
    if (props.appType === 'android') {
      return `https://play.google.com/store/apps/details?id=${props.appId}`;
    }
    if (props.appType === 'ios') {
      return `https://apps.apple.com/app/id${props.appId}`;
    }
    if (props.appType === 'mac') {
      return `https://apps.apple.com/app/id${props.appId}`;
    }
    if (props.appType === 'appletv') {
      return '';
    }
    return '';
  };

  const getAlternativeText = (): string => {
    if (props.appType === 'android') {
      return 'Download from the Play Store';
    }
    if (props.appType === 'ios') {
      return 'Download from the iOS App Store';
    }
    if (props.appType === 'mac') {
      return 'Download from the Mac App Store';
    }
    if (props.appType === 'appletv') {
      return 'Download from the AppleTV App Store';
    }
    return '';
  };

  return (
    <LinkBase
      id={props.id}
      className={getClassName(AppDownloadButton.displayName, className)}
      style={props.style}
      variant='image'
      target={getAppUrl()}
    >
      {badgeSource && (
        <Image
          source={badgeSource}
          alternativeText={getAlternativeText()}
          isLazyLoadable={isLazyLoadable}
        />
      )}
    </LinkBase>
  );
}
AppDownloadButton.displayName = 'KibaAppDownloadButton';
