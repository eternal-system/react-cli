import React, { useState, useEffect, useRef } from 'react'
// import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { Routes } from 'router'
// import { Empty } from '@components'

import DropIcon from '@icons/drop-down.svg'
import FolderIcon from '@icons/home-filled.svg'
import OpenEditorIcon from '@icons/open-editor.svg'

import css from './style.module.scss'

interface Props {
  data: { name: string, path: string }[],
  edit: any;
  title: string;
}

export default function DropdownProject ({
  title
  // data,
  // edit
}: Props) {
  // const { t } = useTranslation('project')
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

  // function handleClick (url: string) {
  //   edit(url.split('/').filter(Boolean))
  // }

  // function renderFavoriteProjects () {
  //   if (!data.length) return <Empty text={t('emptyFavoriteFolders')} />

  //   return data.map((f, i) => (
  //     <div key={i} onClick={() => handleClick(f.path)}><FolderIcon /><span>{f.path}</span></div>
  //   ))
  // }

  return (
    <>
      <button ref={btnRef} className={css.dropdown} onClick={() => setOpen(!open)}>
        <div className={css.title}>{title}</div>
        {renderIcon(DropIcon)}
        {open && (
          <div className={css.list} ref={divRef}>
            {/* {renderFavoriteProjects()} */}
            <div onClick={() => history.push(Routes.PROJECT)}><OpenEditorIcon /><span>Open</span></div>
            <div onClick={() => history.push(Routes.PROJECT)}><FolderIcon /><span>Home</span></div>
          </div>
        )}
      </button>
    </>
  )
}
