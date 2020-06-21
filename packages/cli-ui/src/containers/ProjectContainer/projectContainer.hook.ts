import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Routes } from 'router'

interface TabItem {
  key: Routes.PROJECT | Routes.PROJECT_SELECT | Routes.PROJECT_IMPORT;
  label: 'Projects' | 'Create' | 'Import';
}

interface HookProps {
  tabs:TabItem[];
  activeTab: string;
  handleSetTab(tabItem: TabItem): void;
}
export default function useProjectContainer (): HookProps {
  const tabs: TabItem[] = [
    { key: Routes.PROJECT, label: 'Projects' },
    { key: Routes.PROJECT_SELECT, label: 'Create' },
    { key: Routes.PROJECT_IMPORT, label: 'Import' }
  ]

  // Router
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if ([Routes.MAIN].includes(location.pathname as Routes)) {
      history.push(Routes.PROJECT)
    }
  }, [location])

  function handleSetTab (tabItem: any) {
    history.push(tabItem.key)
  }

  return {
    tabs,
    activeTab: location.pathname,
    handleSetTab
  }
}
