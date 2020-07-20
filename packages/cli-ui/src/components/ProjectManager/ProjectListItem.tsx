import React from 'react'
import css from './style.module.scss'
import CloseIcon from '$icons/close.svg'
import StarIcon from '$icons/star.svg'
import StarAddIcon from '$icons/star-add.svg'

interface Props {
  id: number;
  name: string;
  path: string;
  favorite: boolean;
  onDelete(id: number): void;
  onFavorite(id: number, favorite: boolean): void;
}

export default function ProjectListItem ({ id, favorite, name, path, onDelete, onFavorite }: Props) {
  return (
    // TODO add logic active element
    <div className={`${css.content} ${id === 1 ? css.active : ''}`}>
      <div className={css.favorite}>
        <button onClick={() => onFavorite(id, favorite)}>
            { favorite ? <StarAddIcon /> : <StarIcon /> }
        </button>
      </div>
      <div className={css.info}>
        <div className={css.name}>{name}</div>
        <div className={css.path}>{ typeof path === 'object' ? `/${path.join('/')}` : `/${path}`}</div>
      </div>
      <div className={css.actions}>
        <button onClick={() => onDelete(id)}>
          <CloseIcon/>
        </button>
      </div>
    </div>
  )
}
