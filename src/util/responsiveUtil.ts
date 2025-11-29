export interface ResponsiveField<FieldType> {
  base?: FieldType;
  small?: FieldType;
  medium?: FieldType;
  large?: FieldType;
  extraLarge?: FieldType;
}

export type CssConverter<FieldType> = (field: FieldType) => string;

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
