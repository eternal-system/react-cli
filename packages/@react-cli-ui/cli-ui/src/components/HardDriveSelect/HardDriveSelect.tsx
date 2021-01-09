import React, { useState, useEffect, useRef, useContext, useCallback } from 'react'
import cn from 'classnames'

import { SettingsContext } from '@context'
import DropIcon from '@icons/drop-down.svg'

import css from './style.module.less'

interface Props {
  option: string[];
  edit(url: string[]): void;
}

export default function HardDriveSelect ({ option, edit }: Props) {
  const { socket, darkTheme } = useContext(SettingsContext)
  const [open, setOpen] = useState(false)
  const [activeHardDrive, setActiveHardDrive] = useState('')
  const divRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside)

    socket.on('selectedHardDrive', (res: any) => {
      setActiveHardDrive(res.data)
    })

    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      socket.off('selectedHardDrive')
    }
  }, [])

  const setHardDrive = useCallback(
    (hardDrive: string) => {
      socket.send({
        type: 'CHANGE_HARD_DRIVE',
        name: hardDrive
      })
      edit([])
    },
    [option]
  )

  function onClickOutside () {
    if (
      divRef.current &&
      !divRef.current.contains(event.target) &&
      !btnRef.current.contains(event.target)
    ) {
      setOpen(false)
    }
  }

  function renderIcon () {
    return (
      <div className={cn(css.icon, { [css.dark]: darkTheme })}>
        <span>{activeHardDrive}</span>
        <DropIcon />
      </div>
    )
  }

  function renderDrives () {
    return option.map((drive: string) => (
      <div key={drive} onClick={() => setHardDrive(drive)}>{drive}</div>
    ))
  }

  return (
    <button ref={btnRef} className={css.dropdown} onClick={() => setOpen(!open)}>
      {renderIcon()}
      {open && (
        <div className={css.list} ref={divRef}>
          {renderDrives()}
        </div>
      )}
    </button>
  )
}
