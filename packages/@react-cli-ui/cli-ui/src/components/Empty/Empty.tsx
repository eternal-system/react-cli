import React from 'react'

import AttachFileIcon from '@icons/attach-file.svg'

import css from './style.module.less'

interface Props {
  text: string;
}

export default function Empty ({ text }: Props) {
  return (
    <div className={css.emptyInfo}>
      <AttachFileIcon />
      {text}
    </div>
  )
}
