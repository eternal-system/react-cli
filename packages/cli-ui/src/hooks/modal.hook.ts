import { useState } from 'react'

export function useModal () {
  const [visible, setVisible] = useState<boolean>(false)

  const showModal = (): boolean => setVisible(true)

  const closeModal = (): boolean => setVisible(false)

  return { showModal, closeModal, visible }
}
