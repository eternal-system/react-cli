import React, { useCallback } from 'react'
import { Route, Switch } from 'react-router-dom'

import { AppRoutes, RouteEntity } from './appRoutes'
import css from '../style/main.module.less'

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
            {
              isRowDirection ? (
                <div className={css.routeRowContainer}>
                  <Component />
                  {createMainRoutes(createPathsArray(paths, 'findDeepRoutes'))}
                </div>
              ) : (
                <>
                  <Component />
                  {createMainRoutes(createPathsArray(paths, 'findDeepRoutes'))}
                </>
              )
            }
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
