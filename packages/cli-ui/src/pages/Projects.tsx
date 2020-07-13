import React, {useEffect, useContext} from 'react'
import { useTranslation } from 'react-i18next'

import { Layout, Content, Empty } from '../components'
import { SettingsContext } from '../context'

export default function Projects () {
  const { t } = useTranslation('project')
  const { socket } = useContext(SettingsContext)

  useEffect(() => {
    socket.send({ 
      type: "GET_PROJECTS"
    })

    socket.on('projects', (res) => {
      console.log("test get projects", res.data)
    })

    return () => {
      socket.off('projects')
    }
  }, [])

  return (
    <Layout>
      <Content>
        <Empty text={t('notFoundProjects')} />
      </Content>
    </Layout>
  )
}
