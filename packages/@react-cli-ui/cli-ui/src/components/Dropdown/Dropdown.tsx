import React, { useState, useEffect, useRef } from 'react'

import DropIcon from '@icons/drop-down.svg'
import FolderIcon from '@icons/folder-filled.svg'

import css from './style.module.scss'

interface Props {
  data: { name: string, path: string },
  edit: any;
}

export default function Dropdown ({data, edit}: Props) {
  const [open, setOpen] = useState(false);
  const divRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  function onClickOutside () {
   if (
      divRef.current &&
      !divRef.current.contains(event.target) &&
      !btnRef.current.contains(event.target)
    ) {
      setOpen(false);
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

  return (
    <>
      <button ref={btnRef} className={css.dropdown} onClick={() => setOpen(!open)}>
        {renderIcon(DropIcon)}
        {open && (
          <div className={css.list} ref={divRef}>
            {data.map((f, i) => {
              return (
                <div key={i} onClick={() => handleClick(f.path)}><FolderIcon /><span>{f.path}</span></div> 
              )
            })}
          </div>
        )}
      </button>
    </>
  )
}
