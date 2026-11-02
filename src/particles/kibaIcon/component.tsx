import React from 'react';

import { getClassName } from '@kibalabs/core';

import { getRegisteredKibaIcon, normalizeKibaIconSvg } from './registry';
import { IComponentProps } from '../../model';
import { Icon } from '../icon';

interface IKibaIconProps extends IComponentProps {
  iconId: string;
  _color?: string;
}

interface IconData {
  url: string;
  shouldAddFill: boolean;
  shouldAddStroke: boolean;
}

const getIconData = (iconId: string): IconData | null => {
  if (iconId.startsWith('ion-')) {
    return {
      url: `https://assets-cdn.kiba.dev/ionicons/v5/${iconId.replace('ion-', '')}.svg`,
      shouldAddFill: true,
      shouldAddStroke: false,
    };
  }
  if (iconId.startsWith('mui-')) {
    return {
      url: `https://assets-cdn.kiba.dev/material-icons/v1/${iconId.replace('mui-', '')}.svg`,
      shouldAddFill: true,
      shouldAddStroke: false,
    };
  }
  if (iconId.startsWith('bs-')) {
    return {
      url: `https://assets-cdn.kiba.dev/bootstrap-icons/v1/${iconId.replace('bs-', '')}.svg`,
      shouldAddFill: true,
      shouldAddStroke: false,
    };
  }
  if (iconId.startsWith('feather-')) {
    return {
      url: `https://assets-cdn.kiba.dev/feather/v4/${iconId.replace('feather-', '')}.svg`,
      shouldAddFill: false,
      shouldAddStroke: true,
    };
  }
  if (iconId.startsWith('remix-')) {
    return {
      url: `https://assets-cdn.kiba.dev/remix-icons/v2/${iconId.replace('remix-', '')}.svg`,
      shouldAddFill: true,
      shouldAddStroke: false,
    };
  }
  return null;
};

// NOTE(krishan711): icons that weren't bundled at build time are fetched at most once per page and shared by every KibaIcon
const fetchedSvgContents = new Map<string, string>();
const inFlightSvgContents = new Map<string, Promise<string>>();
const FETCH_RETRY_DELAY_MILLIS = 1000;

const fetchSvgContent = async (url: string, retryCount: number): Promise<string> => {
  try {
    const response = await fetch(url);
    if (response.status >= 300) {
      throw new Error(`Failed to fetch icon from ${url}: ${response.status}`);
    }
    return normalizeKibaIconSvg(await response.text());
  } catch (error: unknown) {
    if (retryCount <= 0) {
      throw error;
    }
    await new Promise((resolve): void => {
      setTimeout(resolve, FETCH_RETRY_DELAY_MILLIS);
    });
    return fetchSvgContent(url, retryCount - 1);
  }
};

const loadSvgContent = (url: string): Promise<string> => {
  const fetchedSvgContent = fetchedSvgContents.get(url);
  if (fetchedSvgContent !== undefined) {
    return Promise.resolve(fetchedSvgContent);
  }
  let inFlightSvgContent = inFlightSvgContents.get(url);
  if (!inFlightSvgContent) {
    inFlightSvgContent = fetchSvgContent(url, 1)
      .then((svgContent: string): string => {
        fetchedSvgContents.set(url, svgContent);
        return svgContent;
      })
      .finally((): void => {
        inFlightSvgContents.delete(url);
      });
    inFlightSvgContents.set(url, inFlightSvgContent);
  }
  return inFlightSvgContent;
};

const getKnownSvgContent = (iconId: string): string | undefined => {
  const registeredSvgContent = getRegisteredKibaIcon(iconId);
  if (registeredSvgContent !== undefined) {
    return registeredSvgContent;
  }
  const iconData = getIconData(iconId);
  return iconData ? fetchedSvgContents.get(iconData.url) : undefined;
};

interface ILoadedSvgContent {
  iconId: string;
  svgContent: string;
}

export function KibaIcon({
  className = '',
  variant = 'default',
  ...props
}: IKibaIconProps): React.ReactElement {
  const iconData = getIconData(props.iconId);
  // NOTE(krishan711): icons bundled at build time (or already fetched) render straight away
  const knownSvgContent = getKnownSvgContent(props.iconId);
  const [loadedSvgContent, setLoadedSvgContent] = React.useState<ILoadedSvgContent | null>(null);

  React.useEffect((): (() => void) | undefined => {
    if (knownSvgContent !== undefined) {
      return undefined;
    }
    const iconId = props.iconId;
    // NOTE(krishan711): covers icons registered (or fetched by another KibaIcon) after this rendered
    const currentKnownSvgContent = getKnownSvgContent(iconId);
    if (currentKnownSvgContent !== undefined) {
      setLoadedSvgContent({ iconId, svgContent: currentKnownSvgContent });
      return undefined;
    }
    const currentIconData = getIconData(iconId);
    if (!currentIconData) {
      console.warn(`Failed to identify icon type from iconId: ${iconId}`);
      return undefined;
    }
    let isCancelled = false;
    loadSvgContent(currentIconData.url)
      .then((svgContent: string): void => {
        if (!isCancelled) {
          setLoadedSvgContent({ iconId, svgContent });
        }
      })
      .catch((): void => {
        if (!isCancelled) {
          setLoadedSvgContent(null);
        }
      });
    return (): void => {
      isCancelled = true;
    };
  }, [props.iconId, knownSvgContent]);

  const svgContent = knownSvgContent ?? (loadedSvgContent?.iconId === props.iconId ? loadedSvgContent.svgContent : null);

  return (
    <Icon
      id={props.id}
      className={getClassName(KibaIcon.displayName, className)}
      variant={variant}
      // eslint-disable-next-line no-underscore-dangle
      _color={props._color}
      shouldAddFill={iconData?.shouldAddFill}
      shouldAddStroke={iconData?.shouldAddStroke}
      svgContent={svgContent || '<svg></svg>'}
    />
  );
}
// TODO(krishan711): this is a terrible name lol but it clashes with Icon otherwise
KibaIcon.displayName = 'KibaKibaIcon';
