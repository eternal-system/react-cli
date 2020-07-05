import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Content } from 'components'
import { Input, Select } from 'common'

import css from './style.module.scss'
import mainCss from '../../style/main.module.scss'

const optionsManager = [
  { value: 'npm', label: 'npm' },
  { value: 'yarn', label: 'yarn' }
]

const optionsPreset = [
  { value: 'create-react-app', label: 'create-react-app' },
  { value: 'custom-react-app', label: 'custom-react-app' }
]

export default function CreateProject () {
  const { t } = useTranslation('projectCreate')

  // State
  const [state, setState] = useState({
    name: '',
    manager: optionsManager[0],
    preset: optionsPreset[0]
  })

  function handleChange ({ value, name }: { value: string, name: string }) {
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
          onChange={handleChange}
        />
        <Select
          name="manager"
          label={t('packageManager')}
          onChange={handleChange}
          options={optionsManager}
          value={state.manager}
        />
        <Select
          name="preset"
          label={t('selectPreset')}
          onChange={handleChange}
          options={optionsPreset}
          value={state.preset}
        />
      </div>
      <button className={mainCss.foulderBtn} onClick={createProject}>
        {`+ ${t('createProject')}`}
      </button>
    </Content>
  )
}
