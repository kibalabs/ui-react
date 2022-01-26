
type ArgType = string | number | boolean | null | undefined;

// NOTE(krish): this is inspired from https://github.com/lukeed/clsx/blob/master/src/index.js
export const getVariant = (...args: ArgType[]): string => {
  const values: string[][] = [];
  args.forEach((arg: ArgType): void => {
    if (arg) {
      values.push(String(arg).trim().split(' '));
    }
  });
  let flattenedValues = values.reduce((accumulator: string[], value: string[]): string[] => accumulator.concat(value), []);
  flattenedValues = flattenedValues.reverse();
  flattenedValues = Array.from(new Set(flattenedValues));
  flattenedValues = flattenedValues.reverse();
  return flattenedValues.join('-');
};
