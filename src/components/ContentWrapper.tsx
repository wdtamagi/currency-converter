/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { FC } from 'react'

export const ContentWrapper: FC<
  React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>
> = ({ children, ...props }) => {
  return (
    <div
      css={css`
        width: 100%;
        padding: 0 235px;
      `}
      {...props}
    >
      {children}
    </div>
  )
}
