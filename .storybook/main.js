import path from 'path';

export default config = {
  stories: [
    '../src/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  staticDir: './.storybook/public',
  addons: [
    // '@storybook/addon-webpack5-compiler-babel',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  typescript: {
    check: false,
  },
  docs: {
    autodocs: true,
  },
  babel: (config) => {
    return {
      ...config,
      configFile: path.resolve(__dirname, "./.babelrc.json"),
    }
  },
};
