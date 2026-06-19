import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    // 1. По умолчанию все тесты запускаются в быстрой node-среде
    environment: 'node',

    // 2. Лечим кривые пакеты из node_modules
    server: {
      deps: {
        inline: [
          // Заставляем Vitest самому трансформировать эти пакеты
          '@csstools/css-calc',
          '@asamuzakjp/css-color',
        ],
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
