import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { Routes } from 'router'
import { SettingsContext } from 'context'

export interface TabItem {
    key: Routes.PROJECT | Routes.PROJECT_SELECT | Routes.DASHBOARD_TASKS_START;
    name: string;
    label: string;
    Icon: React.FC;
}

interface HookProps {
  locale: string | null;
  activeTab: string;
  handleSetTab(menuItem: TabItem): void;
}
export default function useTaskContainer (): HookProps {
  // Router
  const history = useHistory()

  // State
  const { locale } = useContext(SettingsContext)

  function handleSetTab (menuItem: any) {
    history.push(menuItem.key)
  }

  return {
    locale,
    activeTab: location.pathname,
    handleSetTab
  }
}
