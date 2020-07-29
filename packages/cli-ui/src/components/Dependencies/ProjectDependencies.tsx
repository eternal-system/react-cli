import React from 'react'
import { useTranslation } from 'react-i18next'
import ProjectDependencyItem from './ProjectDependencyItem'
import css from './style.module.scss'

interface PropsItem {
  baseFir: string;
  id: string;
  installed: boolean;
  type: string;
  versionRange: string;
  website: string;
}

interface PropsDepend {
  list: PropsItem[];
}

export default function ProjectDependencies ({list}: PropsDepend) {
  console.log("list", list)
  const { t } = useTranslation('project')

  const listDepend = list.filter(p => p.type === "dependencies")
  const listDevDepend = list.filter(p => p.type === "devDependencies")

  return (
    <div className={css.wrapper}>
      {listDepend.length ? <div className={css.title}>Main dependencies</div> : null}
      {listDepend.map(dep => (
        <ProjectDependencyItem 
         key={dep.id}
         {...dep}
        />
      ))}
      {listDevDepend.length ? <div>Development dependencies</div> : null}
      {listDevDepend.map(dep => (
        <ProjectDependencyItem
         key={dep.id}
         {...dep}
        />
      ))}
    </div>
  )
}
