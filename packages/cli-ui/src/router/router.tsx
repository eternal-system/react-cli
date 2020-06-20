import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { AppRoutes, RouteEntity } from './appRoutes'

export default function renderRoutes () {
  return (
    <Router>
      <Switch>
        {Object.keys(AppRoutes).map((key) => {
          const { Component, paths, exact = false } = AppRoutes[key] as RouteEntity
          return (
            <Route exact={exact} path={Object.values(paths)} key={key}>
              <Component />
            </Route>
          )
        })}
      </Switch>
    </Router>
  )
}
