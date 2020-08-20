import React, { useState, useEffect, useRef } from 'react'
import DropIcon from '@icons/drop-down.svg'

import css from './style.module.scss'

export default function Dropdown () {
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

  return (
      <>
        <button ref={btnRef} className={css.dropdown} onClick={() => setOpen(!open)}>
            {renderIcon(DropIcon)}
        </button>
        {open && (
            <div ref={divRef}>
                <ui>
                    <li> list favorite </li>
                </ui>
            </div>
        )}
      </>
  )
}
