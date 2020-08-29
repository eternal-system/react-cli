import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Modal } from '@components'
import { Input, Select } from 'common'

import css from './style.module.scss'

export interface ModalFolder {
    visible?: boolean;
    showModal?(e: React.MouseEvent<HTMLElement>): void;
    closeModal?(e: React.MouseEvent<HTMLElement>): void;
}

const optionsType = [
  { value: 'dependencies', label: 'dependencies' },
  { value: 'devDependencies', label: 'devDependencies' }
]

const selectStyles = {
  container: (base: any, state: any) => ({
    ...base,
    opacity: state.isDisabled ? '.5' : '1',
    backgroundColor: 'transparent',
    zIndex: '999'
  })
}

function DependenciesModal ({ visible, closeModal }: ModalFolder) {
  const { t } = useTranslation('modal')
  const [state, setState] = useState({
    type: optionsType[0],
    search: ''
  })

  function handleChange ({ value, name }: { value: string, name: string }) {
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  function onSubmit (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    typeof closeModal === 'function' && closeModal(e)
  }

  return (
    <div className={css.modal}>
      <Modal
        title={`${t('titleDepend')}`}
        okText={`${t('install')}`}
        visible={visible}
        onOk={onSubmit}
        onCancel={closeModal}
      >
        <Select
          name="type"
          label={t('dependencies:type')}
          onChange={handleChange}
          styles={selectStyles}
          options={optionsType}
          value={state.type}
        />
        <Input
          name="search"
          label={t('dependencies:search')}
          placeholder={t('dependencies:search')}
          className={css.projectName}
          value={state.search}
          onChange={handleChange}
        />
            Componet list
      </Modal>
    </div>
  )
}

export default React.memo(DependenciesModal)
