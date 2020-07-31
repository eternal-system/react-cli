import React from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardWrap } from '@components'

export default function Tasks () {
  const { t } = useTranslation('dashboard')

  return (
    <DashboardWrap title={t('titleTasks')}>
      <div>Tasks</div>
    </DashboardWrap>

  )
}
