import React from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardWrap } from 'components'

export default function Dependencies () {
  const { t } = useTranslation('dashboard')

  return (
    <DashboardWrap>
      Dependencies 
    </DashboardWrap>
  )
}
