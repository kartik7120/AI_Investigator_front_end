import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite",
  typescript: {
    // 1. Prevents heavy TypeScript parsers from freezing HMR pipelines
    reactDocgen: 'react-docgen',
  },
  viteFinal: async (config) => {
    if (config.server) {
      config.server.watch = {
        ...config.server.watch,
        // 2. Forces Vite to poll files if OS file event system stalls
        usePolling: true,
      };
    }
    return config;
  },
};
export default config;