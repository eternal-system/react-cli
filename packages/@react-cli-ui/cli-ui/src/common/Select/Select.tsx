import React, { useMemo } from 'react'
import SelectComponent, { Props } from 'react-select'
import cn from 'classnames'

import FolderFilledIcon from '@icons/folder-filled.svg'

import css from './style.module.scss'

interface OwnProps extends Props {
  options?: any;
  className?: string;
  label?: string;
  value?: any;

  name?: number | string;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
  prefix?: string;
  /** @TODO add to real types */
  styles?: any;
  onChange?: any;
  onKeyPress?: any;
  onFocus?: any;
  onBlur?: any;
  onClick?: any;
}

function Select (props: OwnProps) {
  const {
    options = {},
    className = null,
    onChange = null,
    name = null,
    value = '',
    label = '',
    prefix = null,
    styles = {}
  } = props

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    onChange({
      value: event,
      name
    })
  }

  const renderPrefix = useMemo(() => {
    switch (prefix) {
      case 'folder':
        return <FolderFilledIcon />
      default:
        return null
    }
  }, [prefix])

  return (
    <div className={cn(css.inputContainer, className)}>
      <label className={css.inputLabel}>{label}</label>
      <div className={css.inputContent}>
        {renderPrefix}
        <SelectComponent
          className={css.select}
          styles={styles}
          {...(onChange && { onChange: handleChange })}
          {...(options && { options })}
          {...(value && { value })}
        />
      </div>
    </div>
  )
}

export default React.memo(Select)
