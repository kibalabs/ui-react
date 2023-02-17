export default config = {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  typescript: {
    check: false
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve = config.resolve || {};
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback.fs = false;
    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true },
  },
  docs: {
    autodocs: true
  },
  staticDir: './.storybook/public',
};
