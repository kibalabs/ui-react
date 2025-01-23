export default {
  stories: [
    '../src/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  staticDir: './.storybook/public',
  framework: {
    name: '@storybook/react-vite',
  },
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
