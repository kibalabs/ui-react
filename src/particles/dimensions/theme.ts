export enum ScreenSize {
  Base = 'base',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  ExtraLarge = 'extra-large',
}

export const defaultScreenSizes: Record<ScreenSize, number> = {
  [ScreenSize.Base]: 0,
  [ScreenSize.Small]: 576,
  [ScreenSize.Medium]: 768,
  [ScreenSize.Large]: 992,
  [ScreenSize.ExtraLarge]: 1200,
};

export const getScreenSizeValue = (size: ScreenSize): number => {
  return defaultScreenSizes[size];
};

export enum PaddingSize {
  None = 'none',
  Default = 'default',
  Narrow = 'Narrow1',
  Narrow1 = 'Narrow1',
  Narrow2 = 'Narrow2',
  Narrow3 = 'Narrow3',
  Narrow4 = 'Narrow4',
  Wide = 'Wide1',
  Wide1 = 'Wide1',
  Wide2 = 'Wide2',
  Wide3 = 'Wide3',
  Wide4 = 'Wide4',
}

export type PaddingSizeProp = PaddingSize | string;

const paddingSizeToVarName: Record<string, string> = {
  [PaddingSize.None]: '0px',
  [PaddingSize.Default]: 'var(--kiba-padding)',
  [PaddingSize.Narrow]: 'var(--kiba-padding-narrow)',
  [PaddingSize.Narrow1]: 'var(--kiba-padding-narrow)',
  [PaddingSize.Narrow2]: 'var(--kiba-padding-narrow2)',
  [PaddingSize.Narrow3]: 'var(--kiba-padding-narrow3)',
  [PaddingSize.Narrow4]: 'var(--kiba-padding-narrow4)',
  [PaddingSize.Wide]: 'var(--kiba-padding-wide)',
  [PaddingSize.Wide1]: 'var(--kiba-padding-wide)',
  [PaddingSize.Wide2]: 'var(--kiba-padding-wide2)',
  [PaddingSize.Wide3]: 'var(--kiba-padding-wide3)',
  [PaddingSize.Wide4]: 'var(--kiba-padding-wide4)',
};

export const getPaddingSizeCss = (size: PaddingSizeProp): string => {
  if (size in paddingSizeToVarName) {
    return paddingSizeToVarName[size];
  }
  const capitalizedSize = size.charAt(0).toUpperCase() + size.slice(1);
  const fieldName = size.startsWith('padding') ? size : `padding${capitalizedSize}`;
  const kebabName = fieldName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  return `var(--kiba-${kebabName})`;
};
