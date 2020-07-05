import React from 'react'

import { ModalFolder } from '../../modals'
import { useModal } from '../../hooks/modal.hook'

import ArrowUpIcon from '$icons/arrow-up.svg'
import RefrechIcon from '$icons/refresh.svg'
import CreateFolderIcon from '$icons/folder-create-filled.svg'
import FolderFilledIcon from '$icons/folder-filled.svg'

import css from './style.module.scss'

interface Props {
  setUrlPath(url: string[]): void;
  updateFolderData(): void;
  back(): void;
  path: string[];
}

// eslint-disable-next-line react/prop-types
function Toolbar ({ setUrlPath, updateFolderData, path, back }: Props) {
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

  function clearUrlPath () {
    return setUrlPath([])
  }

  return (
    <>
      <div className={css.toolbar}>
        <button onClick={back}>
          {renderIcon(ArrowUpIcon)}
        </button>
        <div className={css.urlPaths}>
          <button onClick={clearUrlPath}>
            {renderIcon(FolderFilledIcon)}
          </button>
          {renderUrlPath()}
        </div>
        <div>
          <button onClick={updateFolderData}>
            {renderIcon(RefrechIcon)}
          </button>
          <button onClick={showModal}>
            {renderIcon(CreateFolderIcon)}
          </button>
        </div>
      </div>
      <ModalFolder
        get={setUrlPath}
        visible={visible}
        closeModal={closeModal}
        path={path}
      />
    </>
  )
}

export default React.memo(Toolbar)
