import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import cn from 'classnames'

import Loader from '@icons/react-logo.svg'

import { Content } from '@components'
import { useModal, useNotification } from '@hooks'
import { Input, Select } from 'common'
import { FileManagerModal } from 'modals'
import { SettingsContext } from 'context'
import { Routes } from 'router'

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
  const history = useHistory()
  const notification = useNotification()
  const { socket, selectedPath } = React.useContext(SettingsContext)

  // State
  const { visible, showModal, closeModal } = useModal()
  const [logInfo, setLogInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    name: '',
    manager: optionsManager[0],
    preset: optionsPreset[0]
  })

  useEffect(() => {
    socket.on('check', (msg) => {
      setLogInfo(prevState =>
        msg.message !== '\n'
          ? msg.message.replace('\n', ' ')
          : prevState
      )
    })
    socket.on('notification', () => {
      setLoading(false)
      history.push(Routes.DASHBOARD)
    })
    socket.on('erro', (error) => {
      setLoading(false)
      notification.error({
        title: error.message,
        message: error.error.path
      })
    })
    return () => {
      socket.off('check')
      socket.off('notification')
      socket.off('erro')
    }
  }, [])

  function handleChange ({ value, name }: { value: string, name: string }) {
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  function createProject () {
    const { name, manager, preset } = state
    setLoading(true)
    socket.send({
      type: 'CREATE_PROJECT',
      name,
      path: selectedPath,
      manager: manager.value,
      preset: preset.value
    })
  }

  if (loading) {
    return (
      <Content>
        <div className={cn(css.createContainer, css.loading)}>
          <Loader />
          <span>
            {`${t('creatingProject')} ${state.name}`}
            <i className={css.loadingDot1}>.</i>
            <i className={css.loadingDot2}>.</i>
            <i className={css.loadingDot3}>.</i>
          </span>
          <div className={css.loadingDescription}>{logInfo}</div>
        </div>
      </Content>
    )
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
