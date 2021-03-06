import { Global, css } from '@emotion/react'
import React, { FC } from 'react'

export const RootStyles: FC = () => (
  <Global
    styles={css`
      body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
      }

      /* custom scrollbar */
      ::-webkit-scrollbar {
        width: 11px;
      }

      ::-webkit-scrollbar-track {
        background-color: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background-color: #cbcbcb;
        border-radius: 20px;
        border: 2px solid transparent;
        background-clip: content-box;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: #a7a7a7;
      }
    `}
  />
)
