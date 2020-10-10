import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { Routes } from 'router'
import { SettingsContext } from 'context'

export interface TabItem {
  key: Routes.PROJECT | Routes.PROJECT_SELECT | Routes.PROJECT_IMPORT;
  label: string;
  Icon: React.FC;
}

interface HookProps {
  locale: string | null;
  activeTab: string;
  darkTheme: boolean | null;
  handleSetTab(tabItem: TabItem): void;
}
export default function useProjectContainer (): HookProps {
  // Router
  const history = useHistory()

  // State
  const { locale, darkTheme } = useContext(SettingsContext)

  function handleSetTab (tabItem: any) {
    history.push(tabItem.key)
  }

  return {
    darkTheme,
    locale,
    activeTab: location.pathname,
    handleSetTab
  }
}
