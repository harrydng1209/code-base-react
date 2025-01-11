import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import { fileURLToPath, URL } from 'node:url';
import autoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

dotenv.config();

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/root/variables";
          @import "@/assets/styles/root/mixins";
        `
      }
    }
  },
  plugins: [
    react(),
    svgr(),
    autoImport({
      dirs: ['src/hooks/shared/**'],
      dts: 'src/@types/auto-imports.d.ts',
      imports: [
        'react',
        'react-router',
        'react-i18next',
        {
          '@/apis': [['default', 'apis']],
          '@/constants': [['default', 'constants']],
          '@/utils': [['default', 'utils']]
        }
      ]
    })
  ],
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.VITE_PORT_PREVIEW) || 3030
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: Number(process.env.VITE_PORT) || 3000
  }
});
