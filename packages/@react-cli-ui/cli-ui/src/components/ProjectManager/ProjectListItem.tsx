import React from 'react'
import css from './style.module.scss'
import CloseIcon from '@icons/close.svg'
import OpenEditorIcon from '@icons/open-editor.svg'
import StarIcon from '@icons/star.svg'
import StarAddIcon from '@icons/star-add.svg'

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
  return (
    <div className={`${css.content} ${id === active ? css.active : ''}`}>
      <div className={css.favorite}>
        <button onClick={() => onFavorite(id)}>
          { favorite ? <StarAddIcon /> : <StarIcon /> }
        </button>
      </div>
      <div className={css.info} onClick={() => onOpen(id)}>
        <div className={css.name}>{name}</div>
        <div className={css.path}>{ typeof path === 'object' ? `/${path.join('/')}` : `/${path}`}</div>
      </div>
      <div className={css.actions}>
        <button onClick={() => onOpenEdit(path)}>
          <OpenEditorIcon/>
        </button>
        <button onClick={() => onDelete(id)}>
          <CloseIcon/>
        </button>
      </div>
    </div>
  )
}
