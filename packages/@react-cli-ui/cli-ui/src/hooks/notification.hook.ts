import { useMemo } from 'react'
import { store } from 'react-notifications-component'

const defaultConfig = {
  title: '',
  message: '',
  type: 'success',
  insert: 'top',
  container: 'top-right',
  animationIn: ['slideInRight'],
  animationOut: ['slideOutRight'],
  dismiss: {
    duration: 5000,
    onScreen: true
  }
}

export function useNotification () {
  const notification = useMemo(
    () => ({
      success: (config: any) => store.addNotification({
        ...defaultConfig,
        ...config
      }),
      error: (config: any) => store.addNotification({
        ...defaultConfig,
        ...config,
        type: 'danger'
      }),
      info: (config: any) => store.addNotification({
        ...defaultConfig,
        ...config,
        type: 'info'
      }),
      warning: (config: any) => store.addNotification({
        ...defaultConfig,
        ...config,
        type: 'warning'
      })
    }),
    []
  )

  return notification
}
