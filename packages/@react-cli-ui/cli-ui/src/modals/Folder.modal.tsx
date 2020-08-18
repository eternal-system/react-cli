import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Api from 'api'

import { Modal, Input } from '@components'
import { useNotification } from '@hooks'

export interface ModalFolder {
  visible?: boolean;
  path: string[];
  get(url: string[]): void;
  closeModal?(e: React.MouseEvent<HTMLElement>): void;
}

export default function ModalFolder ({ visible, closeModal, path, get }: ModalFolder) {
  const notification = useNotification()
  // State
  const initForm = { title: '' }
  const { t } = useTranslation('modal')
  const [form, setForm] = useState(initForm)

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
    Api.POST('/api/folders/create', {
      url: `/${[...path, ...createFoldersPath(form.title)].join('/')}`
    })
      .then(res => {
        console.log(res)
        notification.success({
          title: 'Success',
          message: res.message
        })
        get([...path, ...createFoldersPath(form.title)])
        closeModal && closeModal(e)
      }).catch((err) => {
        console.log(err)
      })
  }

  function onChange (e: React.FormEvent<HTMLInputElement>) {
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
