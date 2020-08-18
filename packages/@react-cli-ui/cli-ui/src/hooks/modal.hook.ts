import { useState, useCallback } from 'react'

export function useModal () {
  const [visible, setVisible] = useState<boolean>(false)

  const showModal = useCallback(
    () => setVisible(true),
    [visible]
  )

  const closeModal = useCallback(
    () => setVisible(false),
    [visible]
  )

  return { showModal, closeModal, visible }
}
