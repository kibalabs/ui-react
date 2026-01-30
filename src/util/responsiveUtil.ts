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
  shouldResetInheritance = false,
): Record<string, string> => {
  if (!field) {
    if (shouldResetInheritance) {
      return {
        [`${variablePrefix}-small`]: 'initial',
        [`${variablePrefix}-medium`]: 'initial',
        [`${variablePrefix}-large`]: 'initial',
        [`${variablePrefix}-extraLarge`]: 'initial',
      };
    }
    return {};
  }
  const result: Record<string, string> = {};
  result[`${variablePrefix}-small`] = field.small !== undefined ? converter(field.small) : 'initial';
  result[`${variablePrefix}-medium`] = field.medium !== undefined ? converter(field.medium) : 'initial';
  result[`${variablePrefix}-large`] = field.large !== undefined ? converter(field.large) : 'initial';
  result[`${variablePrefix}-extraLarge`] = field.extraLarge !== undefined ? converter(field.extraLarge) : 'initial';
  return result;
};
