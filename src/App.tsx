import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { NavigationBar } from './components/NavigationBar'
import { ROUTES } from './constants/routes'
import { RootStyles } from './RootStyles'

function App() {
  return (
    <BrowserRouter>
      <RootStyles />
      <NavigationBar />
      <Switch>
        <Route path={ROUTES.CURRENCY_CONVERTER}>
          <div />
        </Route>
        <Route path={ROUTES.CURRENCY_RATES}>
          <div />
        </Route>
        <Redirect to={ROUTES.CURRENCY_CONVERTER} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
