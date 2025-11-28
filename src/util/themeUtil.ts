import { camelCaseToKebabCase } from '@kibalabs/core';

export const valueToCss = (value: string): string => {
  if (value.startsWith('$')) {
    const strippedValue = value.substring(1);
    const strippedValueParts = strippedValue.split('.');
    const referenceType = strippedValueParts[0];
    const referenceValue = strippedValueParts[1];
    if (referenceType === 'colors') {
      return `var(--kiba-color-${camelCaseToKebabCase(referenceValue)})`;
    }
    if (referenceType === 'dimensions') {
      return `var(--kiba-dimension-${camelCaseToKebabCase(referenceValue)})`;
    }
    console.error(`Unknown reference used: ${referenceType} (${value})`);
  }
  return value;
};
