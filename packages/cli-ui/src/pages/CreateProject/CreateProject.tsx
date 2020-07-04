import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Content } from 'components'
import { Input } from 'common'

import css from './style.module.scss'
import mainCss from '../../style/main.module.scss'

export default function CreateProject () {
  const { t } = useTranslation('projectCreate')

  // State
  const [state, setState] = useState({
    name: ''
  })

  function changeProjectName ({ value, name }: { value: string, name: string }) {
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  function createProject () {
    console.debug('createProject')
  }

  return (
    <Content>
      <div className={css.createContainer}>
        <h2 className={css.createTitle}>{t('createProjectTitle')}</h2>
        <Input
          name="name"
          label={t('nameProject')}
          prefix="folder"
          className={css.projectName}
          value={state.name}
          onChange={changeProjectName}
        />
      </div>
      <button className={mainCss.foulderBtn} onClick={createProject}>
        {`+ ${t('createProject')}`}
      </button>
    </Content>
  )
}
