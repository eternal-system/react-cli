import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip'
import cn from 'classnames'

import { DropdownTasks } from '@components'
import { OpenEditorIcon, StarAddIcon, EditIcon, CloseIcon, StarIcon, ReactLogoIcon, VueLogoIcon } from '@icons'

import css from './style.module.less'

interface Props {
  id: string;
  name: string;
  type: string;
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
  type,
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

  function renderProjectIcon () {
    switch (type) {
      case 'react':
        return <ReactLogoIcon className={css.reactIcon} />
      case 'vue':
        return <VueLogoIcon/>
      default:
        return null
    }
  }

  return (
    <div className={styles}>
      <div className={css.favorite}>
        <button onClick={() => onFavorite(id)} data-tip={t('projects.add')}>
          { favorite ? <StarAddIcon /> : <StarIcon /> }
        </button>
      </div>
      <div className={css.info}>
        <div className={css.name}>
          {renderProjectIcon()}
          <span onClick={() => onOpen(id)}>{name}</span>
          <DropdownTasks
            elementId={id}
            onTask={onTask}
            data={tasks}
            /** @TODO remove console.log */
            edit={() => console.log('edit')}
          />
        </div>
        <div
          className={css.path}
          onClick={() => onOpen(id)}
        >
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
