import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const userRules = {
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  '@typescript-eslint/no-misused-promises': [
    'error',
    { checksVoidReturn: false },
  ],
  'react-hooks/exhaustive-deps': 'error',
};
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  ...userRules,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
