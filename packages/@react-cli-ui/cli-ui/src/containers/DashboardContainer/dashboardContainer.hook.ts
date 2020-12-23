import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { Routes } from 'router'
import { SettingsContext } from '@context'

export interface MenuItems {
  key: Routes.DASHBOARD | Routes.DASHBOARD_TASKS_START | Routes.DEPENDENCIES;
  label: string;
  Icon: React.FC;
}

interface HookProps {
  locale: string | null;
  activeTab: string;
  handleSetTab(menuItem: MenuItems): void;
}
export default function useDashboardContainer (): HookProps {
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
