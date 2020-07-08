import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Content, Loader } from 'components'
import { Input, Select } from 'common'
import { FileManagerModal } from 'modals'
import { useModal } from 'hooks'
import { useHistory } from 'react-router-dom'
import Api from 'api'
import { SettingsContext } from 'context'
import css from './style.module.scss'
import mainCss from '../../style/main.module.scss'
import { Routes } from '../../router'

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
  const history = useHistory()
  const { visible, showModal, closeModal } = useModal()
  const { selectedPath } = React.useContext(SettingsContext)

  // State
  const [state, setState] = useState({
    name: '',
    manager: optionsManager[0],
    preset: optionsPreset[0]
  })

  const [loading, setLoading] = useState(false)

  function handleChange ({ value, name }: { value: string, name: string }) {
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  function createProject () {
    const { name, manager, preset } = state
    setLoading(true)
    Api.POST('/api/projects/create', {
      name,
      path: selectedPath,
      manager: manager.value,
      preset: preset.value
    }).then((res) => {
      console.log('res', res)
      setLoading(false)
      history.push(Routes.DASHBOARD)
    }).catch((error) => {
      console.log('error', error)
      setLoading(false)
    })
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Content>
      <div className={css.createContainer}>
        <h2 className={css.createTitle}>{t('createProjectTitle')}</h2>
        <Input
          name="name"
          label={t('nameProject')}
          placeholder={t('typeName')}
          prefix="folder"
          className={css.projectName}
          value={state.name}
          onChange={handleChange}
        />
        <FileManagerModal
          folderName={state.name}
          visible={visible}
          closeModal={closeModal}
          showModal={showModal}
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
