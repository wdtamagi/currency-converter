/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { FC } from 'react'

import { SectionTitle } from '../components/SectionTitle'
import { ContentWrapper } from '../components/ContentWrapper'
import { CurrencyTable } from '../components/CurrencyTable'

const ExchangeRates: FC = () => {
  return (
    <section>
      <ContentWrapper
        css={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          box-sizing: border-box;
          padding-top: 83px;
        `}
      >
        <SectionTitle
          title="US Dollar (USD) Exchange Rates"
          css={css`
            padding-bottom: 39px;
          `}
        />
        <CurrencyTable />
      </ContentWrapper>
    </section>
  )
}

export default ExchangeRates
