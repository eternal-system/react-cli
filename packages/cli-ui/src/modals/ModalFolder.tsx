import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Modal from '../components/Modal'
import { Input } from '../components/Form'

export interface ModalFolder {
  visible?: boolean;
  path?: string;
  get?(url?: string): void;
  closeModal?(e: React.MouseEvent<HTMLElement>): void;
}

export function ModalFolder ({ visible, closeModal, path, get }: ModalFolder) {
  const initForm = { title: '' }
  const { t } = useTranslation('modal')
  const [form, setForm] = useState(initForm)

  useEffect(() => {
    return () => {
      setForm(initForm)
    }
  }, [setForm, visible])

  function onSubmit (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const url = `/api/folders/create?url=${path}/${form.title}`

    fetch(url, {
      method: 'POST'
    })
      .then(response => response.text())
      .then(res => {
        console.log(res)
        console.log(url)
        get(`${path}/${form.title}`)
        if (closeModal) {
          closeModal()
        }
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
