export default (config) => {
  const newConfig = config;
  newConfig.entries = {
    index: './src/index.ts',
    'toast/index': './src/toast/index.ts',
    'dropzone/index': './src/dropzone/index.ts',
  };
  return newConfig;
};
