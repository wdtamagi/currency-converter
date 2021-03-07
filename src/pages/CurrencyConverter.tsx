/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { FC } from 'react'

import { SectionTitle } from '../components/SectionTitle'
import { ContentWrapper } from '../components/ContentWrapper'
import { CurrencySelection } from '../components/CurrencySelection'
import { ConverterContextProvider } from '../context/ConverterContext'

const CurrencyConverter: FC = () => {
  return (
    <ConverterContextProvider>
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
            <CurrencySelection selectionType="A" />
            <CurrencySelection selectionType="B" />
          </div>
        </ContentWrapper>
      </section>
    </ConverterContextProvider>
  )
}

export default CurrencyConverter
