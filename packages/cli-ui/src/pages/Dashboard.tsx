import React from 'react'
import { DashboardWrap, KillPort, WelcomeTips } from '@components'

export default function Dashboard () {
  return (
    <DashboardWrap title={'Project dashboard'}>
      <WelcomeTips />
      <KillPort />
    </DashboardWrap>
  )
}
