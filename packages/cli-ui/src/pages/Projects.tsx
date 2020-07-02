import React from 'react'
import { useTranslation } from 'react-i18next'

import { Layout, Content, Empty } from '../components'

export default function Projects () {
  const { t } = useTranslation('project')

  return (
    <Layout>
      <Content>
        <Empty text={t('notFoundProjects')} />
      </Content>
    </Layout>
  )
}
