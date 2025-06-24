import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'es2022',
  clean: true,
  shims: true,
  noExternal: [/@repo\//, /@r2r\//],
  esbuildOptions(options) {
    options.alias = {
      '@': './src',
      '@repo/config': './stubs/@repo/config',
      '@repo/messaging': './stubs/@repo/messaging',
      '@repo/types': './stubs/@repo/types',
      '@repo/utils': './stubs/@repo/utils',
      '@r2r/messaging': './stubs/@r2r/messaging',
    };
  },
});