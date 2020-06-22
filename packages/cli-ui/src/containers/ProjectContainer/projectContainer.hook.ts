import { useHistory } from 'react-router-dom'
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

  function handleSetTab (tabItem: any) {
    history.push(tabItem.key)
  }

  return {
    tabs,
    activeTab: location.pathname,
    handleSetTab
  }
}
