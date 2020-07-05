import React from 'react'
import { useTranslation } from 'react-i18next'

import { SettingsContext } from 'context'
import { Modal, FileManager } from '../../components'

import EditIcon from '$icons/edit-pen.svg'

import css from './style.module.scss'

export interface ModalFolder {
  folderName: string;
  visible?: boolean;
  showModal?(e: React.MouseEvent<HTMLElement>): void;
  closeModal?(e: React.MouseEvent<HTMLElement>): void;
}

function FileManagerModal ({ folderName, visible, closeModal, showModal }: ModalFolder) {
  const { t } = useTranslation('modal')
  const { selectedPath } = React.useContext(SettingsContext)

  function onSubmit (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    typeof closeModal === 'function' && closeModal(e)
  }

  return (
    <div className={css.modal}>
      <label>
        {`/${selectedPath.join('/')}${selectedPath.length && folderName ? '/' : ''}`}
        <strong>{folderName}</strong>
      </label>
      <button onClick={showModal}>
        <EditIcon />
      </button>
      <Modal
        title={`${t('selectFolder')}`}
        okText={`${t('common:select')}`}
        visible={visible}
        onOk={onSubmit}
        onCancel={closeModal}
      >
        <FileManager />
      </Modal>
    </div>
  )
}

export default React.memo(FileManagerModal)
