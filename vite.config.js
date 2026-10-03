import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('gsap') || id.includes('lenis')) return 'motion'
          if (id.includes('react')) return 'react'
        },
      },
    },
  },
})
