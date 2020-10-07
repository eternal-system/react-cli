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

  function handleClick (url: string[]) {
    edit(url)
  }

  function renderFavoriteProjects () {
    const filterFavorite = (project: Project) => project.favorite === true
    const filterName = (project: Project) => project.name !== title
    const projects = data.length ? [...data].filter(filterFavorite).filter(filterName) : []

    if (!projects.length) return <div><AttachFileIcon /><span>{t('emptyFavoriteFolders')}</span></div>

    return projects.map((f, i) => (
      <div key={i} onClick={() => handleClick(f.path)}><StarIcon /><span>{f.name}</span></div>
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
            {renderFavoriteProjects()}
            <div onClick={() => history.push(Routes.PROJECT)}>
              <FolderIcon />
              <span>{t('projectManagerReact')}</span>
            </div>
          </div>
        )}
      </button>
    </>
  )
}
