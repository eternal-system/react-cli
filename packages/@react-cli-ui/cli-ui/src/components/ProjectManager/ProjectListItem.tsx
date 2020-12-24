import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip'
import cn from 'classnames'

import { DropdownTasks } from '@components'
import OpenEditorIcon from '@icons/open-editor.svg'
import StarAddIcon from '@icons/star-add.svg'
import EditIcon from '@icons/edit-pen.svg'
import CloseIcon from '@icons/close.svg'
import StarIcon from '@icons/star.svg'

import css from './style.module.less'

interface Props {
  id: string;
  name: string;
  path: string[];
  favorite: boolean;
  active: string;
  tasks: any[];
  onDelete(id: string): void;
  onOpen(id: string): void;
  onTask(id: string | null): void;
  onOpenEdit(path: string[]): void;
  onFavorite(id: string): void;
}

export default function ProjectListItem ({
  id,
  active,
  favorite,
  name,
  path,
  tasks,
  onTask,
  onOpen,
  onOpenEdit,
  onDelete,
  onFavorite
}: Props) {
  const { t } = useTranslation('toolbar')

  const styles = cn(css.content, {
    [css.active]: id === active
  })

  return (
    <div className={styles}>
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
        <DropdownTasks
          elementId={id}
          onTask={onTask}
          data={tasks}
          edit={() => console.log('edit')}/>
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
