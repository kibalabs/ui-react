export default function setDefaults<Props, Defaults>(props: Props, defaults: Defaults): Required<Props> {
  const newProps: Required<Props> = { ...props } as Required<Props>;
  const defaultKeys = Object.keys(defaults) as (string)[];
  defaultKeys.forEach((key) => {
    const propKey = key as keyof Props;
    const defaultKey = key as keyof Defaults;
    Object.defineProperty(newProps, key, {
      value: props[propKey] !== undefined ? props[propKey] : defaults[defaultKey],
    });
  });
  return newProps;
}
