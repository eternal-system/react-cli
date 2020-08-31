import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { Modal } from '@components'
import { Input, Select } from 'common'
import { SettingsContext } from 'context'
import { useGetPackages } from '@hooks'

import ItemPackages from './ItemPackages'

import css from './style.module.scss'

type Title = {
  name: string | null,
  type: string
}

export interface ModalFolder {
    setLoading(loading: boolean): void;
    setTitle(props: Title): void;
    visible?: boolean;
    showModal?(e: React.MouseEvent<HTMLElement>): void;
    closeModal?(e: React.MouseEvent<HTMLElement>): void;
}

export interface Props {
  value: string;
  name: string;
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

function DependenciesModal ({ visible, closeModal, setLoading, setTitle }: ModalFolder) {
  const { t } = useTranslation('modal')
  const { socket } = useContext(SettingsContext)
  const [state, setState] = useState({
    type: optionsType[0],
    search: ''
  })
  const [active, setActive] = useState(null)
  const { packages, fetchPackages } = useGetPackages('')

  function handleChange ({ value, name }: Props) {
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  function onInputChange ({ value, name }: Props) {
    handleChange({ value, name })
    fetchPackages(value)
  }

  function onSubmit (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    socket.send({
      type: 'INSTALL_DEPENDINCIES',
      name: active,
      dep: state.type.value
    })
    setState({
      type: optionsType[0],
      search: ''
    })
    setTitle({ name: active, type: 'INSTALL' })
    setActive(null)
    setLoading(true)
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
              const { package } = el
              const key = package.name || `${package?.links.npm}`
              return (
                <ItemPackages
                  key={key}
                  active={active}
                  change={setActive}
                  pkg={package}
                />
              )
            })}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default React.memo(DependenciesModal)
