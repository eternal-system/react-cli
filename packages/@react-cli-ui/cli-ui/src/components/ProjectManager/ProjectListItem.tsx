import React from 'react'
import { useTranslation } from 'react-i18next'
import { DropdownTasks } from '@components'

import css from './style.module.scss'

import CloseIcon from '@icons/close.svg'
import OpenEditorIcon from '@icons/open-editor.svg'
import StarIcon from '@icons/star.svg'
import StarAddIcon from '@icons/star-add.svg'
import EditIcon from '@icons/edit-pen.svg'
import ReactTooltip from 'react-tooltip'

interface Props {
  id: number;
  name: string;
  path: string[];
  favorite: boolean;
  active: number;
  onDelete(id: number): void;
  onOpen(id: number): void;
  onOpenEdit(path: string[]): void;
  onFavorite(id: number): void;
}

export default function ProjectListItem ({ id, active, favorite, name, path, onOpen, onOpenEdit, onDelete, onFavorite }: Props) {
  const { t } = useTranslation('toolbar')
  return (
    <div className={`${css.content} ${id === active ? css.active : ''}`}>
      <div className={css.favorite}>
        <button onClick={() => onFavorite(id)} data-tip={t('projects.add')}>
          { favorite ? <StarAddIcon /> : <StarIcon /> }
        </button>
      </div>
      <div className={css.info}>
        <div
          className={css.name}
          onClick={() => onOpen(id)}>
          {name}
        </div>
        <DropdownTasks data={[]} edit={() => console.log('edit')}/>
        <div
          className={css.path}
          onClick={() => onOpen(id)}>
          { typeof path === 'object' ? `/${path.join('/')}` : `/${path}`}
        </div>
      </div>
      <div className={css.actions}>
        <button onClick={() => onOpenEdit(path)}>
          <OpenEditorIcon/><span>{t('projects.open')}</span>
        </button>
        <button data-tip={t('projects.edit')}>
          <EditIcon/>
        </button>
        <button onClick={() => onDelete(id)} data-tip={t('projects.delete')}>
          <CloseIcon/>
        </button>
      </div>
      <ReactTooltip place="top"
        effect="solid"
        delayShow={700}
        offset={{ top: -10 }}
      />
    </div>
  )
}
