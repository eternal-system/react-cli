import React from 'react'
import { useTranslation } from 'react-i18next'

import  DashboardWrap  from '../components/DashboardWrap/DashboardWrap'

export default function Statistics () {
  const { t } = useTranslation('dashboard')

  return (
    <DashboardWrap>
      <div>Statistics</div>
    </DashboardWrap>
    
  )
}
