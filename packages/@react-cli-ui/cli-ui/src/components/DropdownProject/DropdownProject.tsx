import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { Routes } from 'router'
import { Project } from '../../containers/DashboardContainer/Dashboard'

import AttachFileIcon from '@icons/attach-file.svg'
import DropIcon from '@icons/drop-down.svg'
import FolderIcon from '@icons/home-filled.svg'
import StarIcon from '@icons/star-add.svg'
import OpenEditorIcon from '@icons/open-editor.svg'

import css from './style.module.scss'

interface Props {
  data: Project[],
  edit: any;
  openEdit: any;
  title: string;
}

export default function DropdownProject ({
  title,
  openEdit,
  data,
  edit
}: Props) {
  const { t } = useTranslation('project')
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const divRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [])

  function onClickOutside () {
    if (
      divRef.current &&
      !divRef.current.contains(event.target) &&
      !btnRef.current.contains(event.target)
    ) {
      setOpen(false)
    }
  }

  function renderIcon (Component: React.FC) {
    return (
      <div className={css.icon}><Component /></div>
    )
  }

  function handleClick (id: string, url: string[]) {
    edit(id, url)
  }

  function renderTitle () {
    if (!data.length) return
    return <div className={css.titleFavorite}>{t('favoriteProjects')}</div>
  }

  function renderFavoriteProjects () {
    if (!data.length) return <div><AttachFileIcon /><span>{t('emptyFavoriteFolders')}</span></div>

    return data.map((f, i) => (
      <div key={i} onClick={() => handleClick(f.id, f.path)}>
        <StarIcon /><span>{f.name}</span>
      </div>
    ))
  }

  return (
    <>
      <button ref={btnRef} className={css.dropdown} onClick={() => setOpen(!open)}>
        <div className={css.title}>
          {title}
        </div>
        {renderIcon(DropIcon)}
        {open && (
          <div className={css.list} ref={divRef}>
            <div onClick={() => openEdit()}>
              <OpenEditorIcon />
              <span>{t('openEditor')}</span>
            </div>
            {renderTitle()}
            {renderFavoriteProjects()}
            <div className={css.manager} onClick={() => history.push(Routes.PROJECT)}>
              <FolderIcon />
              <span>{t('projectManagerReact')}</span>
            </div>
          </div>
        )}
      </button>
    </>
  )
}
