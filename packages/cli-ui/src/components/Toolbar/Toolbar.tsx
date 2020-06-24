import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  update?(): void;
  back?(): void;
  path?: string;
}

export default function Toolbar ({ update, path, back }: Props) {
  const { t } = useTranslation('common')

  return (
    <div className="toolbar">
      <button onClick={back}>^</button>
      {`${t('path')}: `} <span>{path}</span>
      <button onClick={update}>{t('reset')}</button>
    </div>
  )
}
