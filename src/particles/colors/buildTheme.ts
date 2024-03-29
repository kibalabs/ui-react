
import { RecursivePartial } from '@kibalabs/core';
import { darken, getLuminance, invert, lighten, transparentize } from 'polished';

import { IColorGuide } from './theme';

function padZeros(num: number, places: number) {
  let numString = num.toString();
  while (numString.length < places) {
    numString = `0${numString}`;
  }
  return numString;
}

export const buildColors = (base?: Partial<IColorGuide>): IColorGuide => {
  const brandPrimary = base?.brandPrimary || '#333333';
  const brandSecondary = base?.brandSecondary || darken(0.2, brandPrimary);
  const background = base?.background || '#f5f5f5';
  const text = base?.text || (getLuminance(background) > 0.5 ? '#222222' : '#eeeeee');
  const textOnBrand = base?.textOnBrand || (getLuminance(brandPrimary) > 0.5 ? '#222222' : '#eeeeee');
  const disabled = base?.disabled || '#777777';
  const disabledText = base?.disabledText || '#444444';
  const error = base?.error || '#ff0033';
  const success = base?.success || '#22bb33';

  const colors = {
    ...(base || {}),
    brandPrimary,
    brandSecondary,
    background,
    text,
    textOnBrand,
    disabled,
    disabledText,
    error,
    success,
  };

  return expandColors(colors);
};

export const buildAlternateColors = (colors: IColorGuide, base?: RecursivePartial<Record<string, Partial<IColorGuide>>>): Record<string, IColorGuide> => {
  const output: Record<string, IColorGuide> = {};

  const inverseBase = base?.inverse || {} as Partial<IColorGuide>;
  const brandPrimary = inverseBase?.brandPrimary || colors.brandPrimary;
  const background = inverseBase?.background || invert(colors.background);
  const text = inverseBase?.text || getLuminance(background) > 0.5 ? '#222222' : '#eeeeee';
  const textOnBrand = inverseBase?.textOnBrand || getLuminance(brandPrimary) > 0.5 ? '#222222' : '#eeeeee';
  output.inverse = expandColors({
    ...colors,
    brandPrimary,
    background,
    text,
    textOnBrand,
    ...base?.inverse,
  });


  Object.keys(base || {}).forEach((alternateColorName: string): void => {
    if (alternateColorName === 'inverse' || !base || !base[alternateColorName]) {
      return;
    }
    output[alternateColorName] = expandColors(base[alternateColorName] as Partial<IColorGuide>);
  });

  return output;
};

const expandColors = (colors: Partial<IColorGuide>): IColorGuide => {
  const values = [0.01, 0.05, 0.10, 0.20, 0.25, 0.50, 0.75, 0.80, 0.90, 0.95];
  const expandedColors = Object.keys(colors).reduce((extendedColors: Partial<IColorGuide>, colorKey: string): Partial<IColorGuide> => {
    const colorValue = colors[colorKey];
    if (/\d+/.test(colorKey.slice(colorKey.length - 1)) || !colorValue) {
      // Don't expand any colors that end in a number
      return extendedColors;
    }
    values.forEach((value: number): void => {
      const valueNumber = padZeros(value * 100, 2);
      const valueKeyLight = `${colorKey}Light${valueNumber}`;
      // eslint-disable-next-line no-param-reassign
      extendedColors[valueKeyLight] = colors?.[valueKeyLight] || lighten(value, colorValue);
      const valueKeyDark = `${colorKey}Dark${valueNumber}`;
      // eslint-disable-next-line no-param-reassign
      extendedColors[valueKeyDark] = colors?.[valueKeyDark] || darken(value, colorValue);
      const valueKeyClear = `${colorKey}Clear${valueNumber}`;
      // eslint-disable-next-line no-param-reassign
      extendedColors[valueKeyClear] = colors?.[valueKeyClear] || transparentize(value, colorValue);
    });
    return extendedColors;
  }, {});
  return { ...colors, ...expandedColors } as IColorGuide;
};
