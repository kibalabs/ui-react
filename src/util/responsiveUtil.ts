import { IDimensionGuide } from '../elements';

export const getResponsiveCss = (screenWidth: string, css: string): string => {
  return `@media (min-width: ${screenWidth}) { ${css} }`;
}

export interface ResponsiveField<FieldType> {
  base?: FieldType;
  small?: FieldType;
  medium?: FieldType;
  large?: FieldType;
  extraLarge?: FieldType;
}

export type CssConverter<FieldType> = (field: FieldType) => string;

export const fieldToResponsiveCss = <FieldType>(field: ResponsiveField<FieldType>, theme: IDimensionGuide, cssConversion: CssConverter<FieldType>): string => {
  const output = [];
  if (field?.base !== undefined) {
    output.push(cssConversion(field.base));
  }
  if (field?.small !== undefined) {
    output.push(getResponsiveCss(theme.screenWidthSmall, cssConversion(field.small)));
  }
  if (field?.medium !== undefined) {
    output.push(getResponsiveCss(theme.screenWidthMedium, cssConversion(field.medium)));
  }
  if (field?.large !== undefined) {
    output.push(getResponsiveCss(theme.screenWidthLarge, cssConversion(field.large)));
  }
  if (field?.extraLarge !== undefined) {
    output.push(getResponsiveCss(theme.screenWidthExtraLarge, cssConversion(field.extraLarge)));
  }
  return output.join('\n');
}
