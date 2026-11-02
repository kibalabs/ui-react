export default (config) => {
  const newConfig = config;
  newConfig.entries = {
    index: './src/index.ts',
    'toast/index': './src/toast/index.ts',
    'dropzone/index': './src/dropzone/index.ts',
    // NOTE(krishan711): runs in node (inside vite) so it must not share code with the browser entries
    'vitePlugin/index': './src/vitePlugin/index.ts',
  };
  return newConfig;
};
