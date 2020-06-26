import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import Input from '../components/Form/Input'

export interface ModalFolder {
    visible?: boolean;
    path?: string;
    closeModal?: (e: React.MouseEvent<HTMLElement>) => void;
}

export function ModalFolder ({ visible, closeModal, path }: ModalFolder) {
  const initForm = { title: '' }
  const [form, setForm] = useState(initForm)

  useEffect(() => {
    return () => {
      setForm(initForm)
    }
  }, [setForm, visible])

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(form, path)
    if (closeModal) {
      closeModal()
    }
  }

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setForm({ ...form, [name]: value })
  }

  return (
    <Modal
      title="Create new folder"
      okText="Create"
      visible={visible}
      onOk={onSubmit}
      onCancel={closeModal}
    >
      <Input
        name={'title'}
        label={'New folder'}
        value={form.title}
        onChange={onChange}
      />
    </Modal>
  )
}
