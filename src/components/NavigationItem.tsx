/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { DARK_BLUE, LIGHTNER_BLUE, WHITE } from '../constants/colors'

interface NavigationItemProp {
  to: string
}
export const NavigationItem: FC<NavigationItemProp> = ({ to, children }) => {
  const isActive = useLocation().pathname === to

  return (
    <Link
      css={css`
        display: flex;
        align-items: center;
        font-size: 16px;
        line-height: 19px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        padding: 22px 48px;
        transition: all 300ms ease-out;
        text-decoration: none;

        ${isActive
          ? `
            font-weight: 900;
            color: ${WHITE};
            background-color: ${DARK_BLUE};
          `
          : `
            font-weight: 500;
            color: ${LIGHTNER_BLUE};
            background-color: transparent;
          `};
      `}
      to={to}
    >
      {children}
    </Link>
  )
}
