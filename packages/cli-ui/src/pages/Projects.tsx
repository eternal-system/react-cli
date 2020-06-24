import React from 'react'
import { useTranslation } from 'react-i18next'

import { Layout, Content } from '../components'

export default function Projects () {
  const { t } = useTranslation('project')
  return (
    <Layout>
      <Content>
        {t('notFoundProjects')}
      </Content>
    </Layout>
  )
}
