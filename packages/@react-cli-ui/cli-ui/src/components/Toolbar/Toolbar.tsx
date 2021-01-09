import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip'
import cn from 'classnames'

import { Input } from 'common'
import { useModal } from '@hooks'
import { Dropdown } from '@components'
import { CreateFolderIcon, FolderFilledIcon, ArrowUpIcon, RefrechIcon, EditIcon, StarAddIcon, StarIcon } from '@icons'

import { ModalFolder } from '../../modals'

import css from './style.module.less'
import HardDriveSelect from 'components/HardDriveSelect'

type Favorites = {
  name: string;
  path: string;
}

interface Props {
  theme: boolean | null;
  path: string[];
  drives: string[];
  favorites: Favorites[]
  setUrlPath(url: string[]): void;
  updateFolderData(): void;
  addFavorite(favorite: boolean): void;
  back(): void;
}

// eslint-disable-next-line react/prop-types
function Toolbar ({ path, theme, drives, favorites, setUrlPath, updateFolderData, addFavorite, back }: Props) {
  const { t } = useTranslation('toolbar')
  const { visible, showModal, closeModal } = useModal()

  // State
  const [isEdit, setIsEdit] = useState(false)
  const [editPath, setEditPath] = useState('')

  const check = path.join('/') === '' ? '/' : `/${path.join('/')}`
  const isFavorite = favorites.some(f => f.path === check)
  const styles = cn(css.toolbar, {
    [css.dark]: theme
  })

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

  function handleClickFolder (e: React.ChangeEvent<any>) {
    return setUrlPath(path.slice(0, Number(e.target.dataset.id) + 1))
  }

  function renderHardDriveSelect () {
    if (!drives.length) return null
    return <HardDriveSelect option={drives} edit={setUrlPath} />
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
    return (
      <Input
        name="path"
        value={editPath}
        onKeyPress={onPathKeyPress}
        onChange={onChangeEditPath}
      />
    )
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
            {renderHardDriveSelect()}
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
            { isFavorite ? renderIcon(StarAddIcon) : renderIcon(StarIcon) }
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
