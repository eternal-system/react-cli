import React from 'react'
import { useTranslation } from 'react-i18next'

import  DashboardWrap  from '../components/DashboardWrap/DashboardWrap'

export default function Active () {
  const { t } = useTranslation('dashboard')

  return (
    <DashboardWrap>
      <div>Active</div>
    </DashboardWrap>
            
  )
}
