import js from '@eslint/js';
import parser from '@typescript-eslint/parser';
import plugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly', console: 'readonly', module: 'readonly',
        beforeEach: 'readonly', afterAll: 'readonly', describe: 'readonly',
        test: 'readonly', expect: 'readonly'
      }
    },
    plugins: { '@typescript-eslint': plugin },
    rules: {
      ...js.configs.recommended.rules,
      ...plugin.configs.recommended.rules,
      ...prettier.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],
      'no-useless-assignment': 'off',
      'no-console': 'off'
    }
  }
];
