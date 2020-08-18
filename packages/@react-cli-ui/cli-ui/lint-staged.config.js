module.exports = {
  'src/**/*.{ts,tsx,js,jsx}': (filenames) => {
    return `eslint --fix --ext .js,.jsx,.ts,.tsx ${filenames.join(' ')}`
  },
  'src/**/*.{css,scss}': ['stylelint --fix'],
  '*.{md,yml,json}': ['prettier --write']
}
