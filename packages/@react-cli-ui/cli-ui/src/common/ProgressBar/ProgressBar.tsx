import React from 'react'
import cn from 'classnames'

import css from './style.module.less'

interface Props {
  className?: 'string';
  animation?: 'stripes' | 'shine' | 'glow';
  color?: 'blue' | 'green' | 'orange';
  progress?: number;
}

export default function ProgressBar (props: Props) {
  const { className, animation = 'shine', color = 'blue', progress = 0 } = props
  const styles = cn(className, css.progressBar, css[color], css[animation])

  return (
    <div className={styles}>
      <span style={{ width: `${progress}%` }}></span>
    </div>
  )
}
