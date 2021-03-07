/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { FC } from 'react'
import { DARK_GRAY, DETAIL_GRAY, LIGHT_GRAY } from '../constants/colors'
import { CURRENCIES, CURRENCIES_ARRAY } from '../constants/currency'
import { useGetExchangeRates } from '../hooks/useGetExchangeRates'

export const CurrencyTable: FC = () => {
  const { data } = useGetExchangeRates({
    variables: {
      baseCurrency: 'USD',
      quoteCurrencies: CURRENCIES_ARRAY,
    },
  })

  return (
    <div
      css={css`
        max-width: 919px;
        border: 1px solid ${DETAIL_GRAY};
        border-radius: 5px;
        overflow: hidden;
      `}
    >
      <table
        css={css`
          width: 100%;
          border-spacing: 0;

          & > thead > tr > th {
            background-color: ${LIGHT_GRAY};
            color: ${DARK_GRAY};
            font-size: 18px;
            line-height: 21px;
            font-weight: 700;
            padding: 20px 23px;
          }

          & > tbody > tr > td {
            color: ${DARK_GRAY};
            font-size: 18px;
            line-height: 21px;
            font-weight: 300;
            padding: 10px 23px;
          }
        `}
      >
        <thead>
          <tr>
            <th align="left">Currency</th>
            <th align="left">Currency Name</th>
            <th align="left">Exchange Rate = 1 USD</th>
          </tr>
        </thead>
        <tbody>
          {CURRENCIES.map((currency) => (
            <tr key={currency.short}>
              <td>{currency.short}</td>
              <td>{currency.name}</td>
              <td>
                {data?.latest.find(
                  (rate) => rate.quoteCurrency === currency.short,
                )?.quote ?? 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
