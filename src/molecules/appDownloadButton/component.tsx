import React from 'react';

import { getClassName, KibaException } from '@kibalabs/core';

import { IMoleculeProps } from '..';
import { LinkBase } from '../../atoms/linkBase';
import { Image } from '../../particles/image';

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
      <Image
        source={`https://assets-cdn.kiba.dev/${props.appType}/download-button/v5/${buttonVariant}.svg`}
        alternativeText={getAlternativeText()}
        isLazyLoadable={isLazyLoadable}
      />
    </LinkBase>
  );
}
AppDownloadButton.displayName = 'KibaAppDownloadButton';
