/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { FC } from 'react'

import { LIGHT_BLUE } from '../constants/colors'
import { ROUTES } from '../constants/routes'
import { ContentWrapper } from './ContentWrapper'
import { NavigationItem } from './NavigationItem'

export const NavigationBar: FC = () => {
  return (
    <nav
      css={css`
        display: flex;
        width: 100%;
        height: 62px;
        background-color: ${LIGHT_BLUE};

        font-size: 16px;
        text-transform: uppercase;
      `}
    >
      <ContentWrapper
        css={css`
          display: flex;
        `}
      >
        <NavigationItem to={ROUTES.CURRENCY_CONVERTER}>
          Currency converter
        </NavigationItem>
        <NavigationItem to={ROUTES.CURRENCY_RATES}>
          Current exchange rates
        </NavigationItem>
      </ContentWrapper>
    </nav>
  )
}
