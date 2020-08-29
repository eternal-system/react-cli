import React from 'react'

import css from './style.module.scss'

export default function ItemPackages ({pkg}: any) {
  return (
    <div className={css.item}>
      <div className={css.icon}>
        <img src={`https://github.com/${pkg.links.repository ? pkg.links.repository.split('/',4)[3] : ''}.png`} alt=""/>
      </div>
      <div className={css.info}>
        <div className={css.name}>
          <span>{pkg.name}</span>
        </div>
        <div className={css.description}>
          <span>{pkg.description}</span>
        </div>
      </div>
    </div>
  )
}