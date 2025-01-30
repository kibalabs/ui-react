export default config = {
  framework: {
    name: '@storybook/react-vite',
  },
  stories: [
    '../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  staticDir: './.storybook/public',
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  typescript: {
    check: false,
  },
  docs: {
    autodocs: true,
  },
};
