import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Modal } from '@components'
import { Input, Select } from 'common'
import { useGetPackages } from '@hooks'

import ItemPackages from './ItemPackages'

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
  const {packages, fetchPackages} = useGetPackages('')

  function handleChange ({ value, name }: { value: string, name: string }) {
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  function onInputChange ({ value, name }: { value: string, name: string }) {
    setState((prevState) => ({ ...prevState, [name]: value }))
    fetchPackages(value)
  }

  function onSubmit (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    console.log(state)
    //typeof closeModal === 'function' && closeModal(e)
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
        <div className={`${css.search} ${packages.length && css.active}`}>
          <Input
            name="search"
            label={t('dependencies:search')}
            placeholder={t('dependencies:search')}
            className={css.projectName}
            value={state.search}
            onChange={onInputChange}
          />
          <div className={css.wrapper}>
              {!!packages.length && packages.map(el => {
                const key = el.package.name || `${el.package.links.npm}`
                return <ItemPackages key={key} pkg={el.package}/>
              })}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default React.memo(DependenciesModal)
