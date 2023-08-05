module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-console': 'warn',
    'no-eval': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'off',

    semi: 'off',
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        bracketSpacing: true,
        printWidth: 80,
        proseWrap: 'always',
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'auto',
        extraSpace: 0,
      },
    ],
    'react/display-name': 'warn',
    'comma-dangle': 0,
  },
};
