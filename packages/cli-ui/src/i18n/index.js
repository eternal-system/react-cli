import i18n from 'i18next'
import locales from './locales'

// Initialization i18n
i18n.init({
  // We use English + debug locale
  lng: 'en',
  fallbackLng: 'dev',

  // By default we use common namespace
  ns: ['common'],
  defaultNS: 'common',

  // Settings for React
  interpolation: {
    escapeValue: false
  },

  // Languages
  resources: locales
})

// Support hot-reload (https://github.com/i18next/react-i18next/issues/6)
if (module.hot) {
  module.hot.accept('./locales', () => {
    setTimeout(() => {
      const newLocales = require('./locales').default

      // Update locale
      for (const [lang, namespaces] of Object.entries(newLocales)) {
        for (const [namespace, strings] of Object.entries(namespaces)) {
          i18n.addResourceBundle(lang, namespace, strings, true, true)
        }
      }

      // Overload components
      i18n.emit('loaded')
    })
  })
}

export default i18n
