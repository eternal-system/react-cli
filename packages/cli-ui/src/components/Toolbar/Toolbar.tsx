import React from 'react'
import { useTranslation } from 'react-i18next'
import { useModal } from '../../hooks/modal.hook'
import { ModalFolder } from '../../modals'

interface Props {
  update?(): void;
  back?(): void;
  path?: string;
}

export default function Toolbar ({ update, path, back }: Props) {
  const { t } = useTranslation('common')
  const { visible, showModal, closeModal } = useModal()

  return (
    <div className="toolbar">
      <button onClick={back}>^</button>
      {`${t('path')}: `}
      <span>{path}</span>
      <button onClick={update}>
        {t('reset')}
      </button>
      <ModalFolder
        visible={visible}
        closeModal={closeModal}
        path={path}
      />
      <button onClick={showModal}>
        + new folder
      </button>
    </div>

  )
}
