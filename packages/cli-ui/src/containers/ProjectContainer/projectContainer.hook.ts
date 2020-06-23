import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Routes } from 'router'
import { SettingsContext } from 'context'

interface TabItem {
  key: Routes.PROJECT | Routes.PROJECT_SELECT | Routes.PROJECT_IMPORT;
  label: string;
}

interface HookProps {
  locale: string;
  tabs:TabItem[];
  isDarkTheme: 'actived' | '';
  activeTab: string;
  handleSetTab(tabItem: TabItem): void;
}
export default function useProjectContainer (): HookProps {
  // Router
  const history = useHistory()

  // State
  const { t } = useTranslation('project')
  const { locale, darkTheme } = useContext(SettingsContext)

  const tabs: TabItem[] = [
    { key: Routes.PROJECT, label: t('projects') },
    { key: Routes.PROJECT_SELECT, label: t('create') },
    { key: Routes.PROJECT_IMPORT, label: t('import') }
  ]

  function handleSetTab (tabItem: any) {
    history.push(tabItem.key)
  }

  return {
    locale,
    tabs,
    isDarkTheme: darkTheme ? 'actived' : '',
    activeTab: location.pathname,
    handleSetTab
  }
}
