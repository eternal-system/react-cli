module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2020: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  globals: {
    name: 'off'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11
  },
  plugins: [
    'node',
    'react',
    '@typescript-eslint'
  ],
  rules: {
  }
}
