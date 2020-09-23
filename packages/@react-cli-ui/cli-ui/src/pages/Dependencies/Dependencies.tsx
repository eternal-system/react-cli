import React, { useState, useEffect, useContext } from 'react'
import { DashboardWrap, ProjectDependencies } from '@components'
import { useTranslation } from 'react-i18next'
import { unstable_batchedUpdates as batch } from 'react-dom'
import cn from 'classnames'

import { useModal, useNotification } from '@hooks'
import { DependenciesModal } from 'modals'

import AddIcon from '@icons/add.svg'
import UpdateIcon from '@icons/update.svg'
import Loader from '@icons/react-logo.svg'

import { SettingsContext } from '../../context'

import css from './style.module.scss'

type Title = {
  name: string | null,
  type: string
}

export default function Dependencies () {
  const { t } = useTranslation('dependencies')
  const { socket } = useContext(SettingsContext)
  const [dependencies, setDependencies] = useState([])
  const [logInfo, setLogInfo] = useState<String>('')
  const [title, setTitle] = useState<Title>({ name: '', type: '' })
  const [loading, setLoading] = useState<Boolean>(false)
  const { visible, showModal, closeModal } = useModal()
  const notification = useNotification()

  useEffect(() => {
    socket.send({
      type: 'GET_LIST_DEPENDINCIES'
    })

    socket.on('dependencies', (res: any) => {
      setDependencies(res.data)
    })

    socket.on('logging', (msg: any) => {
      setLogInfo(msg.message)
    })

    socket.on('notification', () => {
      socket.send({
        type: 'GET_LIST_DEPENDINCIES'
      })
      batch(() => {
        setLoading(false)
        setLogInfo('')
      })
    })

    socket.on('erro', (error: any) => {
      setLoading(false)
      notification.error({
        title: error.title,
        message: error.message
      })
    })
    return () => {
      socket.off('dependencies')
      socket.off('logging')
      socket.off('notification')
      socket.off('erro')
    }
  }, [])

  function renderButton () {
    return (
      <div>
        <button onClick={showModal}><AddIcon />{t('install')}</button>
        <button><UpdateIcon />{t('update')}</button>
      </div>
    )
  }

  function renderAnimatedDots () {
    return new Array(3).fill('.').map((content, i) => (
      <i
        key={`key-${i}`}
        className={css[`loadingDot${i + 1}`]}
      >
        {content}
      </i>
    ))
  }

  function removeDepend (name: string) {
    if (name) {
      socket.send({
        type: 'UNINSTALL_DEPENDINCIES',
        name
      })
      setTitle({ name, type: 'DELETE' })
      setLoading(true)
    }
  }

  if (loading) {
    return (
      <div className={cn(css.createContainer, css.loading)}>
        <Loader />
        <span>
          {`${title.type === 'INSTALL' ? t('npmInstall') : t('npmUninstall')} ${title.name} `}
          {renderAnimatedDots()}
        </span>
        <div className={css.loadingDescription}>{logInfo}</div>
      </div>
    )
  }

  return (
    <DashboardWrap title={t('titleDepend')} btn={renderButton()}>
      <DependenciesModal
        visible={visible}
        closeModal={closeModal}
        showModal={showModal}
        setLoading={setLoading}
        setTitle={setTitle}
      />
      <ProjectDependencies
        list={dependencies}
        onDelete={removeDepend}
      />
    </DashboardWrap>
  )
}
