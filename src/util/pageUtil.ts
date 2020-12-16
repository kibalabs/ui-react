
export const getIsRunningOnBrowser = (): boolean => {
  return typeof window !== 'undefined';
}
