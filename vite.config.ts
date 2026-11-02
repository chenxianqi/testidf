import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import idf from './idf.json';

// 本地开发用。平台构建时不读这个文件(用的是同样的 react + tailwind 配置)。
// /f(表单)和 /m(图片)转到平台,本地 npm run dev 也能真的提交表单。
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/f/': { target: idf.api, changeOrigin: true },
      '/m/': { target: idf.api, changeOrigin: true },
    },
  },
});
