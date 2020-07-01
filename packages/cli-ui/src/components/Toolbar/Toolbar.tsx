import React from 'react'
import { useTranslation } from 'react-i18next'

import { ModalFolder } from '../../modals'
import { useModal } from '../../hooks/modal.hook'

import css from './style.module.scss'

interface Props {
  get?(url?: string): void;
  update?(): void;
  back?(): void;
  path?: string;
}

export default function Toolbar ({ get, update, path, back }: Props) {
  const { t } = useTranslation('common')
  const { visible, showModal, closeModal } = useModal()

  return (
    <div className={css.toolbar}>
      <button onClick={back}>^</button>
      {`${t('path')}: `}
      <span>{path}</span>
      <button onClick={update}>
        {t('reset')}
      </button>
      <ModalFolder
        get={get}
        visible={visible}
        closeModal={closeModal}
        path={path}
      />
      <button onClick={showModal}>
        + {t('newFolder')}
      </button>
    </div>

  )
}
