import React from 'react'
import css from './style.module.scss'
import CloseIcon from '$icons/close.svg'
import StarIcon from '$icons/star.svg'

interface Props {
  name: string;
  path: string;
}
export default function ProjectListItem ({ name, path }: Props) {
  return (
    <div className={css.content}>
      <div className={css.favorite}>
        <button>
          <StarIcon />
        </button>
      </div>
      <div className={css.info}>
        <div className={css.name}>{name}</div>
        <div className={css.path}>{ typeof path === 'object' ? `/${path.join('/')}` : `/${path}`}</div>
      </div>
      <div className={css.actions}>
        <button>
          <CloseIcon/>
        </button>
      </div>
    </div>
  )
}
