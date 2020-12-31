module.exports = {
  stories: [
    '../src/**/*.stories.@(mdx|js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  typescript: {
    check: false,
  },
};
