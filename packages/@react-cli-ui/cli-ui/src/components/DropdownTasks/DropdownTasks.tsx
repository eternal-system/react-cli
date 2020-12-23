import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip'

import { Empty } from '@components'

import css from './style.module.less'

interface Props {
  data: any[]; // { name: string, path: string }[],
  edit: any;
  elementId: string;
  onTask(id: string | null): void;
}

export default function DropdownTasks ({ data, elementId, onTask }: Props) {
  const { t } = useTranslation('toolbar')
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<string | null>(null)
  const divRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    setId(elementId)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      setId(null)
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

  function handleClick (id: string | null, name: string) {
    console.log(id, name)
  }

  function renderListTasks () {
    if (!data.length) return <div className={css.element}><Empty text={t('projects.noData')} /></div>
    return data.map((f, i) => (
      <div key={i}
        className={css.element}
        onClick={() => handleClick(id, f.name)}
      >
        <div className={css.icon}><f.Icon/></div>
        <div className={css.wrapperTask}>
          <span>{f.name}</span>
          <div>{f.label}</div>
        </div>
      </div>
    ))
  }

  return (
    <>
      <div
        ref={btnRef}
        // data-tip={t('projects.tasks')}
        className={css.dropdown}
        onClick={() => {
          setOpen(!open)
          onTask(id)
        }}>
        {open && (
          <div className={css.list} ref={divRef}>
            <div className={css.title}>{t('projects.tasks')}</div>
            {renderListTasks()}
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
