import { IDimensionGuide } from '../particles';

export const getResponsiveCss = (screenWidth: string, css: string): string => {
  return `@media (min-width: ${screenWidth}) { ${css} }`;
};

export interface ResponsiveField<FieldType> {
  base?: FieldType;
  small?: FieldType;
  medium?: FieldType;
  large?: FieldType;
  extraLarge?: FieldType;
}

export type CssConverter<FieldType> = (field: FieldType) => string;

export const getCss = (fieldName: string): CssConverter<string> => {
  return (value: string): string => `${fieldName}: ${value};`;
};

export const fieldToResponsiveCss = <FieldType>(field: ResponsiveField<FieldType>, theme: IDimensionGuide, cssConversion: CssConverter<FieldType>): string => {
  const output: string[] = [];
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
};

const identityConverter = <T>(value: T): string => String(value);

export const responsiveValueToCss = <FieldType>(
  field: ResponsiveField<FieldType> | null | undefined,
  variablePrefix: string,
  converter: CssConverter<FieldType> = identityConverter,
): Record<string, string> => {
  if (!field) {
    return {};
  }
  const result: Record<string, string> = {};
  if (field.small !== undefined) {
    result[`${variablePrefix}-small`] = converter(field.small);
  }
  if (field.medium !== undefined) {
    result[`${variablePrefix}-medium`] = converter(field.medium);
  }
  if (field.large !== undefined) {
    result[`${variablePrefix}-large`] = converter(field.large);
  }
  if (field.extraLarge !== undefined) {
    result[`${variablePrefix}-extraLarge`] = converter(field.extraLarge);
  }
  return result;
};
