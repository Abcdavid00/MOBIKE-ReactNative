module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',

  },
  plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'react', 'react-hooks', 'unused-imports'],
  extends: [
    // 'airbnb-typescript/base',
    'prettier',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-fragments': 'off',
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never', js: 'never' }],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'] },
    ],
    "unused-imports/no-unused-imports-ts": "error",
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
};