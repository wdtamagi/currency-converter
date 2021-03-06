import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { NavigationBar } from './components/NavigationBar'
import { ROUTES } from './constants/routes'
import { RootStyles } from './RootStyles'

const CurrencyConverter = lazy(() => import('./pages/CurrencyConverter'))

function App() {
  return (
    <BrowserRouter>
      <RootStyles />
      <NavigationBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={ROUTES.CURRENCY_CONVERTER}>
            <CurrencyConverter />
          </Route>
          <Route path={ROUTES.CURRENCY_RATES}>
            <div />
          </Route>
          <Redirect to={ROUTES.CURRENCY_CONVERTER} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
