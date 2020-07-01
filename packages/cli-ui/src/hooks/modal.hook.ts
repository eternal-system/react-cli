import { useState } from 'react'

export function useModal () {
  const [visible, setVisible] = useState<boolean>(false)

  function showModal () {
    setVisible(true)
  }

  function closeModal () {
    setVisible(false)
  }

  return { showModal, closeModal, visible }
}
