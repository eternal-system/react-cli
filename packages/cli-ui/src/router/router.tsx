import React, { useCallback } from 'react'
import { Route, Switch } from 'react-router-dom'

import { AppRoutes, RouteEntity } from './appRoutes'
import css from '../style/main.module.scss'

export default function renderRoutes () {
  const createPathsArray = useCallback(
    (pathObject, isDeepPath?) => {
      return Object.values(pathObject).filter((path) => isDeepPath ? typeof path === 'object' : typeof path !== 'object')
    },
    [AppRoutes]
  )

  const createMainRoutes = useCallback(
    (appRoutes) => {
      return Object.keys(appRoutes).map((key) => {
        const { Component, paths, exact = false, isRowDirection } = appRoutes[key] as RouteEntity
        return (
          <Route exact={exact} path={Object.values(createPathsArray(paths)) as string[]} key={key}>
            <div className={isRowDirection ? css.routeRowContainer : css.routeColumnContainer}>
              <Component />
              {createMainRoutes(createPathsArray(paths, 'findDeepRoutes'))}
            </div>
          </Route>
        )
      })
    },
    [AppRoutes]
  )

  return (
    <Switch>
      {createMainRoutes(AppRoutes)}
    </Switch>
  )
}
