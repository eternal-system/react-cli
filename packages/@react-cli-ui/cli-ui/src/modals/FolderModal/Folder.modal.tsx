import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { SettingsContext } from 'context'

import { Modal, Input } from '@components'
import { useNotification } from '@hooks'

export interface ModalFolder {
  visible?: boolean;
  path: string[];
  get(url: string[]): void;
  closeModal?(e: React.MouseEvent<HTMLElement>): void;
}

export default function ModalFolderModal ({ visible, closeModal, path, get }: ModalFolder) {
  const notification = useNotification()
  // State
  const initForm = { title: '' }
  const { t } = useTranslation('modal')
  const { socket } = useContext(SettingsContext)
  const [form, setForm] = useState(initForm)

  useEffect(() => {
    socket.on('notification-folder', (res: any) => {
      notification.success({
        title: 'Success',
        message: res.message
      })
    })
    return () => {
      socket.off('notification-folder')
    }
  }, [])

  useEffect(() => {
    return () => {
      setForm(initForm)
    }
  }, [setForm, visible])

  function createFoldersPath (str: string) {
    return str.split(/\//g).filter(path => path !== '')
  }

  function onSubmit (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    socket.send({
      type: 'CREATE_FOLDER',
      url: `/${[...path, ...createFoldersPath(form.title)].join('/')}`
    })
    get([...path, ...createFoldersPath(form.title)])
    closeModal && closeModal(e)
  }

  function onChange (e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name
    const value = e.target.value
    setForm({ ...form, [name]: value })
  }

  return (
    <Modal
      title={`${t('createNew')}`}
      okText={`${t('create')}`}
      visible={visible}
      onOk={onSubmit}
      onCancel={closeModal}
    >
      <Input
        name='title'
        label={`${t('newFolder')}`}
        value={form.title}
        onChange={onChange}
      />
    </Modal>
  )
}
