import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip'
import { Empty } from '@components'

import FolderIcon from '@icons/folder-filled.svg'

import css from './style.module.scss'

interface Props {
  data: { name: string, path: string }[],
  edit: any;
}

export default function DropdownTasks ({ data, edit }: Props) {
  const { t } = useTranslation('toolbar')
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
    <>
      <div ref={btnRef} data-tip={t('projects.tasks')} className={css.dropdown} onClick={() => setOpen(!open)}>
        {open && (
          <div className={css.list} ref={divRef}>
            {renderFavoriteFolders()}
          </div>
        )}
        <ReactTooltip place="top"
          effect="solid"
          delayShow={700}
          offset={{ top: -10 }}
        />
      </div>
    </>
  )
}
