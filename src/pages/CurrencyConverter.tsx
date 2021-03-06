/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { FC } from 'react'

import { SectionTitle } from '../components/SectionTitle'
import { ContentWrapper } from '../components/ContentWrapper'
import { CurrencySelection } from '../components/CurrencySelection'

const CurrencyConverter: FC = () => {
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
          title="Currency converter"
          subtitle="Please enter the amount you want to convert in any field."
          css={css`
            padding-bottom: 62px;
          `}
        />
        <div
          css={css`
            display: flex;
            gap: 49px;
          `}
        >
          <CurrencySelection />
          <CurrencySelection />
        </div>
      </ContentWrapper>
    </section>
  )
}

export default CurrencyConverter
