import React from 'react'
import { DashboardWrap, KillPort, WelcomeTips } from '@components'

export default function Dashboard () {
  return (
    <DashboardWrap>
      <WelcomeTips />
      <KillPort />
    </DashboardWrap>
  )
}
