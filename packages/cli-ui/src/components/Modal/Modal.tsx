import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import css from './style.module.scss'

export interface ModalInterface {
    visible?: boolean;
    title?: React.ReactNode | string;
    okText?: React.ReactNode | string;
    onOk?: (e: React.MouseEvent<HTMLElement>) => void;
    onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
    children: React.PropsWithChildren<React.ReactNode>;
}

export default function Modal (props: ModalInterface) {
  const { visible = false, title = 'Title', children, okText = 'Ok' } = props
  const { t } = useTranslation('modal')

  const ref = useRef<HTMLDivElement>(null)

  function handleCancel (e?: React.MouseEvent<HTMLButtonElement>) {
    const { onCancel } = props
    if (onCancel) {
      onCancel(e!)
    }
  }

  function handleOk (e?: React.MouseEvent<HTMLButtonElement>) {
    const { onOk } = props
    if (onOk) {
      onOk(e!)
    }
  }

  function handleClickOutside (e?: React.MouseEvent) {
    if (ref.current && !ref.current.contains(e.target)) {
      handleCancel()
    }
  }

  function handleClose (e: KeyboardEvent) {
    if (e.keyCode === 27) {
      handleCancel()
    }
  }

  useEffect(() => {
    const element = document.getElementById('root')
    if (visible) {
      document.addEventListener('click', handleClickOutside, true)
      document.addEventListener('keydown', handleClose)
      element.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
      document.removeEventListener('keydown', handleClose)
      element.style.overflow = null
    }
  }, [visible])

  return (
    <>
      {visible && (
        <div className={css.modalWrapper}>
          <div className={css.modalContent} ref={ref}>
            <button onClick={handleCancel} className={css.modalClose}>
              <span className={css.modalCloseX} >X</span>
            </button>
            <form onSubmit={handleOk}>
              <div className={css.modalHeader}>
                {title}
              </div>
              <div className={css.modalBody}>
                {children}
              </div>
              <div className={css.modalFooter}>
                <button onClick={handleCancel}>{`${t('cancel')}`}</button>
                <button type="submit">{okText}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
