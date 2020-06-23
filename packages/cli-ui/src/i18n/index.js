import i18n from 'i18next'
import locales from './locales'

// Инициализация i18n
i18n.init({
  // Ипользуем русский + отладочную локаль
  lng: 'en',
  fallbackLng: 'dev',

  // По умолчанию используем неймспейс common
  ns: ['common'],
  defaultNS: 'common',

  // Настройки для React
  interpolation: {
    escapeValue: false
  },

  // Языки
  resources: locales
})

// Поддержка горячей перезагрузки (https://github.com/i18next/react-i18next/issues/6)
if (module.hot) {
  module.hot.accept('./locales', () => {
    setTimeout(() => {
      const newLocales = require('./locales').default

      // Обновляем локаль
      // eslint-disable-next-line
      for (const [lang, namespaces] of Object.entries(newLocales)) {
        // eslint-disable-next-line
        for (const [namespace, strings] of Object.entries(namespaces)) {
          i18n.addResourceBundle(lang, namespace, strings, true, true)
        }
      }

      // Перегружаем компоненты
      i18n.emit('loaded')
    })
  })
}

export default i18n
