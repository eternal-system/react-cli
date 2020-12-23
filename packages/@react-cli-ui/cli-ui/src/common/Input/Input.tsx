import React, { useMemo } from 'react'
import cn from 'classnames'

import FolderFilledIcon from '@icons/folder-filled.svg'

import css from './style.module.less'

interface Props {
  className?: string;
  name?: number | string;
  placeholder?: string;
  label?: string;
  value?: string;
  type?: string;
  maxLength?: string;
  autoFocus?: boolean;
  prefix?: string;
  suffix?: string;
  autocomplete?: 'on' | 'off' | 'current-password' | 'new-password';
  /** @TODO add to real types */
  onChange?: any;
  onKeyPress?: any;
  onFocus?: any;
  onBlur?: any;
  onClick?: any;
}

function Input (props: Props) {
  const {
    className = null,
    onChange = null,
    onFocus = null,
    onBlur = null,
    onClick = null,
    onKeyPress = null,
    name = null,
    value = '',
    label = '',
    placeholder = null,
    type = 'text',
    maxLength = null,
    autocomplete = null,
    autoFocus = false,
    prefix = null,
    suffix = null
  } = props

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    onChange({
      value: event.target.value,
      name
    })
  }

  function handleFocus (event: React.ChangeEvent<HTMLInputElement>) {
    onFocus({
      value: event.target.value,
      name
    })
  }

  function handleBlur (event: React.ChangeEvent<HTMLInputElement>) {
    onBlur({
      value: event.target.value,
      name
    })
  }

  function handleClick (event: React.ChangeEvent<HTMLInputElement>) {
    onClick({
      value: event.target.value,
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

  const renderSufix = useMemo(() => {
    switch (suffix) {
      case 'folder':
        return <FolderFilledIcon />
      default:
        return null
    }
  }, [suffix])

  return (
    <div className={cn(css.inputContainer, className)}>
      <label className={css.inputLabel}>{label}</label>
      <div className={css.inputContent}>
        {renderPrefix}
        <input
          className={css.input}
          {...(onChange && { onChange: handleChange })}
          {...(onFocus && { onFocus: handleFocus })}
          {...(onBlur && { onBlur: handleBlur })}
          {...(onClick && { onClick: handleClick })}
          {...(placeholder && { placeholder })}
          {...(name && { name })}
          {...(maxLength && { maxLength })}
          {...(autocomplete && { autocomplete })}
          {...(onKeyPress && { onKeyPress })}
          autoFocus={autoFocus}
          type={type}
          value={value}
        />
        {renderSufix}
      </div>
    </div>
  )
}

export default React.memo(Input)
