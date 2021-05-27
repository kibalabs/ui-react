
// TODO(krishan711): move this to core-js
export const camelCaseToKebabCase = (value: string): string => {
  return value.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};
