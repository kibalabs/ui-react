import { useDeepCompareMemo } from "@kibalabs/core-react";

// NOTE(Ajadi-Abiola): copied from <'https://dev.to/bytebodger/default-props-in-react-ts-part-deux-2ic3'>
export const useDefaultProps = <Props, Defaults> (props: Props, defaultProps: Defaults): Props & Defaults => {
  return useDeepCompareMemo((): Props & Defaults => {
    // const newProps: Required<Props> = { ...props } as Required<Props>;
    // Object.keys(defaults).forEach((key: string): void => {
    //   const propKey = key as keyof Props;
    //   const defaultKey = key as keyof Defaults;
    //   Object.defineProperty(newProps, key, {
    //     value: props[propKey] !== undefined ? props[propKey] : defaults[defaultKey],
    //   });
    // });
    // return newProps;
    const mergedProps = { ...defaultProps, ...props };
    return mergedProps as Props & Defaults;
  }, [props, defaultProps]);
};
