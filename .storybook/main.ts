import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

import { kibaIconsPlugin } from '../src/vitePlugin/index.ts';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['./public'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  typescript: {
    check: false,
  },
  docs: {
    autodocs: true,
  },
  viteFinal: (config) => {
    // NOTE(krishan711): the stories use the source files, so the icons are registered with the source registry
    config.plugins = [...(config.plugins || []), kibaIconsPlugin({ registrationModule: fileURLToPath(new URL('../src/particles/kibaIcon/registry.ts', import.meta.url)) })];
    return config;
  },
};

export default config;
