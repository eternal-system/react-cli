module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-prettier/recommended'
  ],
  rules: {
    /* Для решение конфликта при нейминге css классов в camelCase
     * И использования их в composes (property из css modules)
     */
    'value-keyword-case': [
      'lower',
      {
        ignoreProperties: ['composes']
      }
    ]
  }
}
