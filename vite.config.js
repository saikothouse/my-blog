import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import markdown from 'vite-plugin-markdown';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    markdown() // Add the markdown plugin here
  ],
  assetsInclude: ['**/*.md'] // Include markdown files as assets if needed
});
