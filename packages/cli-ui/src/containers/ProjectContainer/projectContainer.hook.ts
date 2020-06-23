import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Routes } from 'router'

interface TabItem {
  key: Routes.PROJECT | Routes.PROJECT_SELECT | Routes.PROJECT_IMPORT;
  label: string;
}

interface HookProps {
  tabs:TabItem[];
  isDarkTheme: 'actived' | '';
  activeTab: string;
  handleSetTab(tabItem: TabItem): void;
}
export default function useProjectContainer (): HookProps {
  const { t } = useTranslation('project')
  const tabs: TabItem[] = [
    { key: Routes.PROJECT, label: t('projects') },
    { key: Routes.PROJECT_SELECT, label: t('create') },
    { key: Routes.PROJECT_IMPORT, label: t('import') }
  ]

  // Router
  const history = useHistory()

  // State
  const [value, setValue] = useState(JSON.parse(localStorage.getItem('thememode')))

  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem('thememode')))
  }, [value])

  function handleSetTab (tabItem: any) {
    history.push(tabItem.key)
  }

  return {
    tabs,
    isDarkTheme: value ? 'actived' : '',
    activeTab: location.pathname,
    handleSetTab
  }
}
