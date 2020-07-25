import React from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardWrap, KillPort } from 'components'

export default function Dashboard () {
  const { t } = useTranslation('dashboard')

  return (
    <DashboardWrap>
      <KillPort />
    </DashboardWrap>
  )
}
