import React from 'react'
import { useTranslation } from 'react-i18next'

import { KillPort } from '../components'
import  DashboardWrap  from '../components/DashboardWrap/DashboardWrap'

export default function DBoard () {
  const { t } = useTranslation('dashboard')

  return (
      <DashboardWrap>
        <KillPort />
      </DashboardWrap>
  )
}
