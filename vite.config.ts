import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Sets '@' to point directly to your /src folder
      '@': path.resolve(__dirname, './src'), 
    },
  },
})
