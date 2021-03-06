/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { FC } from 'react'

import { DARK_GRAY } from '../constants/colors'

interface CurrencyConverterProp
  extends React.ClassAttributes<HTMLDivElement>,
    React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
}
export const SectionTitle: FC<CurrencyConverterProp> = ({
  title,
  subtitle,
  ...props
}) => {
  return (
    <div
      {...props}
      css={css`
        display: flex;
        flex-direction: column;
        gap: 9px;
        grid-area: title;

        color: ${DARK_GRAY};
      `}
    >
      <h2
        css={css`
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        `}
      >
        {title}
      </h2>
      <h3
        css={css`
          font-size: 18px;
          font-weight: 300;
          margin: 0;
        `}
      >
        {subtitle}
      </h3>
    </div>
  )
}
