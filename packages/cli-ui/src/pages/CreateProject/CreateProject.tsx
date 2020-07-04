import React, { useState } from 'react'

import { Content } from 'components'
import { Input } from 'common'

import css from './style.module.scss'

export default function CreateProject () {
  const [state, setState] = useState({
    name: ''
  })

  function changeProjectName ({ value, name }: { value: string, name: string }) {
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <Content>
      <div className={css.createContainer}>
        <h2 className={css.createTitle}> Create new project </h2>
        <Input
          name="name"
          label="Project folder"
          prefix="folder"
          className={css.projectName}
          value={state.name}
          onChange={changeProjectName}
        />
      </div>
    </Content>
  )
}
