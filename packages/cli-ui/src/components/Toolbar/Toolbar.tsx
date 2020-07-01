import React from 'react'

import { ModalFolder } from '../../modals'
import { useModal } from '../../hooks/modal.hook'

import ArrowUpIcon from '$icons/arrow-up.svg'
import RefrechIcon from '$icons/refresh.svg'
import CreateFolderIcon from '$icons/folder-create-filled.svg'

import css from './style.module.scss'

interface Props {
  get(url: string): void;
  update?(): void;
  back?(): void;
  path: string[];
}

export default function Toolbar ({ get, update, path, back }: Props) {
  const { visible, showModal, closeModal } = useModal()

  function renderIcon (Component: React.FC) {
    return (
      <div className={css.icon}><Component /></div>
    )
  }

  function renderUrlPath () {
    return path.map((url: string) => {
      return (
        <div key={url} className={css.urlElement}>{url}</div>
      )
    })
  }

  return (
    <>
      <div className={css.toolbar}>
        <button onClick={back}>
          {renderIcon(ArrowUpIcon)}
        </button>
        {renderUrlPath()}
        <div>
          <button onClick={update}>
            {renderIcon(RefrechIcon)}
          </button>
          <button onClick={showModal}>
            {renderIcon(CreateFolderIcon)}
          </button>
        </div>
      </div>
      <ModalFolder
        get={get}
        visible={visible}
        closeModal={closeModal}
        path={path}
      />
    </>
  )
}
