import React from 'react'
import { useTranslation } from 'react-i18next'

import { DashboardWrap, KillPort, WelcomeTips } from '@components'

export default function Dashboard () {
  const { t } = useTranslation('dashboard')

  return (
    <DashboardWrap title={t('titleDashboar')}>
      <WelcomeTips />
      <KillPort />
    </DashboardWrap>
  )
}
