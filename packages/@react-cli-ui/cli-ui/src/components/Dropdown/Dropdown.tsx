import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Empty } from '@components'
import DropIcon from '@icons/drop-down.svg'
import FolderIcon from '@icons/folder-filled.svg'

import css from './style.module.less'

interface Props {
  data: { name: string; path: string }[],
  edit: any;
}

export default function Dropdown ({ data, edit }: Props) {
  const { t } = useTranslation('project')
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

  function handleClick (url: string) {
    edit(url.split('/').filter(Boolean))
  }

  function renderFavoriteFolders () {
    if (!data.length) return <Empty text={t('emptyFavoriteFolders')} />

    return data.map((f, i) => (
      <div key={i} onClick={() => handleClick(f.path)}><FolderIcon /><span>{f.path}</span></div>
    ))
  }

  return (
    <button ref={btnRef} className={css.dropdown} onClick={() => setOpen(!open)}>
      {renderIcon(DropIcon)}
      {open && (
        <div className={css.list} ref={divRef}>
          {renderFavoriteFolders()}
        </div>
      )}
    </button>
  )
}
