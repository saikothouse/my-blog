import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import markdown from 'vite-plugin-markdown'; // Ensure this is the correct import

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    markdown() // Ensure this is called correctly
  ],
  assetsInclude: ['**/*.md'] // Include markdown files as assets
});
