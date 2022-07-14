module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:prettier/recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-unused-vars': ['error', { varsIgnorePattern: '_', argsIgnorePattern: '_' }],
    'no-case-declarations': 'off',
  },
  plugins: ['simple-import-sort'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@/*', './src/*']],
        extensions: ['.js', '.json'],
      },
    },
  },
};
