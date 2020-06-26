import React, { useEffect, useRef } from 'react'

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

  const ref = useRef<HTMLDivElement>(null)

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onCancel } = props
    if (onCancel) {
      onCancel(e)
    }
  }

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onOk } = props
    if (onOk) {
      onOk(e)
    }
  }

  const handleClickOutside = (e: React.MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      handleCancel()
    }
  }

  const handleClose = (ev: KeyboardEvent) => {
    if (ev.keyCode === 27) {
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
        <div className="modal__wrapper" >
          <div className="modal__content" ref={ref}>
            <button onClick={handleCancel} className="modal__close">
              <span className="modal__close_x" >X</span>
            </button>
            <form onSubmit={handleOk}>
              <div className="modal__header">
                {title}
              </div>
              <div className="modal__body">
                {children}
              </div>
              <div className="modal__footer">
                <button onClick={handleCancel}>Cancel</button>
                <button type="submit">{okText}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
