
export const getVariant = (...variants: (string | undefined | null)[]): string => {
  const values = variants.reduce((current: string[], value: string | undefined | null): string[] => {
    if (value) {
      current.push(String(value).trim());
    }
    return current;
  }, []);
  return values.join('-');
};
