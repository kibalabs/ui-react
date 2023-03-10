import path from 'path';

export default config = {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  staticDir: './.storybook/public',
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  typescript: {
    check: false
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true },
  },
  docs: {
    autodocs: true,
  },
  features: {
    babelModeV7: false,
  },
  babel: (config) => {
    return {
      ...config,
      configFile: path.resolve(__dirname, "./.babelrc.json"),
    }
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve = config.resolve || {};
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback.fs = false;
    return config;
  },
};
