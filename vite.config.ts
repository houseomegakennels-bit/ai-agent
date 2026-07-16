import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'apps/command-interface',
  build: {
    outDir: '../../dist/command-interface',
    emptyOutDir: true,
  },
});
