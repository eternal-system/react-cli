import React, { useState, useEffect } from 'react'

import { Input } from 'common'
import { useModal } from '@hooks'
import { ModalFolder } from '../../modals'
import { Dropdown } from '@components'
import ReactTooltip from 'react-tooltip'
import { useTranslation } from 'react-i18next'

import EditIcon from '@icons/edit-pen.svg'
import ArrowUpIcon from '@icons/arrow-up.svg'
import RefrechIcon from '@icons/refresh.svg'
import Star from '@icons/star.svg'
import StarAdd from '@icons/star-add.svg'
import CreateFolderIcon from '@icons/folder-create-filled.svg'
import FolderFilledIcon from '@icons/folder-filled.svg'
import cn from 'classnames'

import css from './style.module.scss'

type Favorites = {
  name: string;
  path: string;
}

interface Props {
  theme: boolean | null;
  setUrlPath(url: string[]): void;
  updateFolderData(): void;
  addFavorite(favorite: boolean): void;
  favorites: Favorites[]
  back(): void;
  path: string[];
}

// eslint-disable-next-line react/prop-types
function Toolbar ({ setUrlPath, updateFolderData, path, theme, back, addFavorite, favorites }: Props) {
  const { visible, showModal, closeModal } = useModal()
  const [isEdit, setIsEdit] = useState(false)
  const [editPath, setEditPath] = useState('')
  const check = path.join('/') === '' ? '/' : `/${path.join('/')}`
  const isFavorite = favorites.some(f => f.path === check)
  const styles = cn(theme ? css.dark : css.ligth, css.toolbar)
  const { t } = useTranslation('toolbar')

  useEffect(() => {
    setEditPath(path.join('/'))
  }, [path, favorites])

  function renderIcon (Component: React.FC) {
    return (
      <div className={css.icon}><Component /></div>
    )
  }

  function clearUrlPath () {
    return setUrlPath([])
  }

  function onChangeEditable () {
    if (isEdit && editPath) {
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

  function handleClickFolder (e) {
    return setUrlPath(path.slice(0, Number(e.target.dataset.id) + 1))
  }

  function renderUrlPath () {
    if (!isEdit) {
      return path.map((url: string, index: number) => (
        <div
          key={url}
          data-id={index}
          className={css.urlElement}
          onClick={handleClickFolder}
        >
          {url}
        </div>
      ))
    }
    return <Input
      name="path"
      value={editPath}
      onKeyPress={onPathKeyPress}
      onChange={onChangeEditPath}
    />
  }

  return (
    <>
      <div className={styles}>
        <button onClick={back} data-tip={t('tooltip.back')} >
          {renderIcon(ArrowUpIcon)}
        </button>
        <div className={css.urlPathsContainer}>
          <div className={css.urlPaths}>
            <button onClick={clearUrlPath} data-tip={t('tooltip.folder')}>
              {renderIcon(FolderFilledIcon)}
            </button>
            {renderUrlPath()}
          </div>
          <button className={css.editBtn} onClick={onChangeEditable} data-tip={t('tooltip.path')} >
            {renderIcon(EditIcon)}
          </button>
        </div>
        <div>
          <button onClick={updateFolderData} data-tip={t('tooltip.update')} >
            {renderIcon(RefrechIcon)}
          </button>

          <button onClick={() => addFavorite(!isFavorite)} data-tip={t('tooltip.favorite')} >
            { isFavorite ? renderIcon(StarAdd) : renderIcon(Star) }
          </button>

          <Dropdown data={favorites} edit={setUrlPath}/>

          <button onClick={showModal} data-tip={t('tooltip.newFolder')} >
            {renderIcon(CreateFolderIcon)}
          </button>
        </div>

        <ReactTooltip place="top"
          effect="solid"
          delayShow={500}
          offset={{ top: -10 }}
        />
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
