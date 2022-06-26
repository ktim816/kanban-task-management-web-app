import path from 'path';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/kanban-task-management-web-app/',
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@store': path.resolve(__dirname, 'src/store'),
      '@composables': path.resolve(__dirname, 'src/composables'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@icons': path.resolve(__dirname, 'src/assets/icons'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import './src/styles/mixins';
        `,
      },
    },
  },
});
