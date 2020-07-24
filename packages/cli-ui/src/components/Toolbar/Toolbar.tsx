import React, { useState, useEffect } from 'react'

import { Input } from 'common'
import { ModalFolder } from '../../modals'
import { useModal } from '../../hooks/modal.hook'

import EditIcon from '$icons/edit-pen.svg'
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
  const [isEdit, setIsEdit] = useState(false)
  const [editPath, setEditPath] = useState('')

  useEffect(() => {
    setEditPath(path.join('/'))
  }, [path])

  function renderIcon (Component: React.FC) {
    return (
      <div className={css.icon}><Component /></div>
    )
  }

  function clearUrlPath () {
    return setUrlPath([])
  }

  function onChangeEditable () {
    if (isEdit) {
      setUrlPath(editPath.split('/'))
    }
    return setIsEdit(prevState => !prevState)
  }

  function onChangeEditPath (e: { value: string }) {
    return setEditPath(e.value)
  }

  function onPathKeyPress (e: React.KeyboardEvent) {
    if (e.charCode === 13) {
      setIsEdit(prevState => !prevState)
      return setUrlPath(editPath.split('/'))
    }
  }

  function renderUrlPath () {
    if (!isEdit) return path.map((url: string) => <div key={url} className={css.urlElement}>{url}</div>)
    return <Input
      name="path"
      value={editPath}
      onKeyPress={onPathKeyPress}
      onChange={onChangeEditPath}
    />
  }

  return (
    <>
      <div className={css.toolbar}>
        <button onClick={back}>
          {renderIcon(ArrowUpIcon)}
        </button>
        <div className={css.urlPathsContainer}>
          <div className={css.urlPaths}>
            <button onClick={clearUrlPath}>
              {renderIcon(FolderFilledIcon)}
            </button>
            {renderUrlPath()}
          </div>
          <button className={css.editBtn} onClick={onChangeEditable}>
            {renderIcon(EditIcon)}
          </button>
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
