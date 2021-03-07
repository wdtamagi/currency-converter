import { ApolloProvider } from '@apollo/client'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { client } from './apollo/client'
import { NavigationBar } from './components/NavigationBar'
import { ROUTES } from './constants/routes'
import { RootStyles } from './RootStyles'

const CurrencyConverter = lazy(() => import('./pages/CurrencyConverter'))
const ExchangeRates = lazy(() => import('./pages/ExchangeRates'))

function App() {
  return (
    <ApolloProvider client={client}>
      <RootStyles />
      <BrowserRouter>
        <NavigationBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={ROUTES.CURRENCY_CONVERTER}>
              <CurrencyConverter />
            </Route>
            <Route path={ROUTES.EXCHANGE_RATES}>
              <ExchangeRates />
            </Route>
            <Redirect to={ROUTES.CURRENCY_CONVERTER} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
