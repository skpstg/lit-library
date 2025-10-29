import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: 'src/**/*.spec.ts',
  nodeResolve: {
    extensions: ['.ts', '.js', '.mjs'],
  },
  coverage: true,
  coverageConfig: {
    threshold: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  browsers: [playwrightLauncher({ product: 'chromium' })],
  plugins: [esbuildPlugin({ ts: true })],
  testFramework: {
    config: {
      timeout: 3000,
    },
  },
};
