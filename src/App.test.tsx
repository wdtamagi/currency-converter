import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import selectEvent from 'react-select-event'

import App from './App'
import { EXCHANGE_RATES } from './hooks/useGetExchangeRates'
import { CURRENCIES_ARRAY } from './constants/currency'

const mocks = [
  {
    request: {
      query: EXCHANGE_RATES,
      variables: {
        baseCurrency: 'USD',
        quoteCurrencies: CURRENCIES_ARRAY,
      },
    },
    result: {
      data: {
        latest: [
          {
            baseCurrency: 'USD',
            quoteCurrency: 'AUD',
            quote: 1.301066,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'BGN',
            quote: 1.639701,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'CHF',
            quote: 0.929198,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'CZK',
            quote: 22.045473,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'EUR',
            quote: 0.839313,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'GBP',
            quote: 0.722464,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'HRK',
            quote: 6.346031,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'HUF',
            quote: 306.769517,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'ISK',
            quote: 128.094753,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'JPY',
            quote: 108.31826,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'NOK',
            quote: 8.552155,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'PLN',
            quote: 3.83641,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'RON',
            quote: 4.092706,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'RUB',
            quote: 74.4275,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'SEK',
            quote: 8.533404,
            __typename: 'Rate',
          },
          {
            baseCurrency: 'USD',
            quoteCurrency: 'TRY',
            quote: 7.532467,
            __typename: 'Rate',
          },
        ],
      },
    },
  },
]

test('Handle with convertion flow', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
  )
  expect(screen.getByText(/Current exchange rates/i)).toBeInTheDocument()
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument()

  await waitFor(
    () => {
      expect(screen.getByText(/1 EUR = 0.839313 USD/i)).toBeInTheDocument()
    },
    { timeout: 3000 },
  )

  fireEvent.change(screen.getByTestId('input-a'), { target: { value: '2' } })
  expect(screen.getByTestId('input-a')).toHaveValue(2)

  await waitFor(() => {
    expect(screen.getByTestId('input-b')).toHaveValue(2.3829012537634946)
  })

  fireEvent.change(screen.getByTestId('input-b'), { target: { value: '1' } })
  expect(screen.getByTestId('input-b')).toHaveValue(1)

  await waitFor(() => {
    expect(screen.getByTestId('input-a')).toHaveValue(0.839313)
  })

  fireEvent.focus(
    within(screen.getByTestId('selection-wrapper-a')).getByRole('textbox'),
  )

  await selectEvent.select(
    within(screen.getByTestId('selection-wrapper-a')).getByRole('textbox'),
    'Japanese yen (JPY)',
  )
  await waitFor(() => {
    expect(screen.getByTestId('input-b')).toHaveValue(108.31826000000001)
  })

  expect(screen.getByText('Japanese yen (JPY)')).toBeInTheDocument()
  expect(screen.getByText('1 JPY = 129.0558587797401 EUR')).toBeInTheDocument()
  expect(screen.getByTestId('input-a')).toHaveValue(0.839313)

  await selectEvent.select(
    within(screen.getByTestId('selection-wrapper-b')).getByRole('textbox'),
    'Swedish krona (SEK)',
  )
  await waitFor(() => {
    expect(screen.getByTestId('input-a')).toHaveValue(8.533404000000003)
  })

  expect(screen.getByText('Swedish krona (SEK)')).toBeInTheDocument()
  expect(
    screen.getByText('1 SEK = 0.07878084452242864 JPY'),
  ).toBeInTheDocument()
  expect(screen.getByTestId('input-b')).toHaveValue(108.31826000000001)
})

test('Handle with rates page', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
  )
  expect(screen.getByText(/Current exchange rates/i)).toBeInTheDocument()

  await waitFor(
    () => {
      expect(screen.getByText(/1 EUR = 0.839313 USD/i)).toBeInTheDocument()
    },
    { timeout: 3000 },
  )

  fireEvent.click(screen.getByText(/Current exchange rates/i))

  await waitFor(() => {
    expect(
      screen.getByText(/US Dollar \(USD\) Exchange Rates/i),
    ).toBeInTheDocument()
  })

  screen.getByText('1.301066')
  screen.getByText('0.929198')
  screen.getByText('0.722464')
  screen.getByText('6.346031')
  screen.getByText('306.769517')
  screen.getByText('8.552155')
  screen.getByText('74.4275')
  screen.getByText('7.532467')
})
