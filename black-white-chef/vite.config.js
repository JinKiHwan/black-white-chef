import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 경로를 짧게 쓰기 위한 별칭 설정 (선택사항)
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 전역으로 주입할 파일 경로를 지정합니다.
        // 추가로 세미콜론(;)을 꼭 붙여주세요!
        additionalData: `
        @use "@/assets/scss/base/_index.scss" as *;
        @use "@/assets/scss/helpers/_index.scss" as *;`,
      },
    },
  },
});
