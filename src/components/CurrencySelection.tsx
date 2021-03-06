/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { FC } from 'react'
import Select from 'react-select'

import {
  DARK_GRAY,
  DETAIL_GRAY,
  LIGHT_GRAY,
  SECONDARY_GRAY,
} from '../constants/colors'
import { CURRENCY_OPTIONS, SYMBOL } from '../constants/currency'

const selectFontStyle = {
  fontSize: '18px',
  lineHeight: '21px',
  fontWeight: '500',
  color: SECONDARY_GRAY,
}

const selectStyles = {
  indicatorSeparator: () => ({
    display: 'none',
  }),
  input: (provided) => ({
    ...provided,
    ...selectFontStyle,
  }),
  control: (provided, state) => ({
    ...provided,
    border: `1px solid ${DETAIL_GRAY}`,
    padding: '10px 20px',

    borderColor: `${DARK_GRAY} !important`,
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '10px 20px',
  }),
  option: (provided) => ({
    ...provided,
    ...selectFontStyle,
  }),
  singleValue: (provided) => ({
    ...provided,
    ...selectFontStyle,
    margin: 0,
    padding: 0,
  }),
  valueContainer: (provided) => ({
    ...provided,
    ...selectFontStyle,
    margin: 0,
    padding: 0,
  }),
}

const fieldLabelStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 13px;
  font-size: 18px;
  line-height: 21px;
  font-weight: 300;
  color: ${SECONDARY_GRAY};
`

interface CurrencySelectionProp
  extends React.ClassAttributes<HTMLDivElement>,
    React.HTMLAttributes<HTMLDivElement> {}
export const CurrencySelection: FC<CurrencySelectionProp> = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 18px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 32px;
          box-sizing: border-box;
          width: 436px;
          color: ${SECONDARY_GRAY};
          padding: 35px;
          background-color: ${LIGHT_GRAY};
          border-radius: 10px;
        `}
      >
        <label css={fieldLabelStyle}>
          Currency
          <Select
            options={CURRENCY_OPTIONS}
            isClearable={false}
            defaultValue={CURRENCY_OPTIONS[0]}
            styles={{
              indicatorSeparator: () => ({
                display: 'none',
              }),
              input: (provided) => ({
                ...provided,
              }),
              control: (provided, state) => ({
                ...provided,
                border: `1px solid ${DETAIL_GRAY} !important`,
                padding: '10px 20px',

                boxShadow: state.isFocused
                  ? `0 0 0 1px ${DARK_GRAY}`
                  : undefined,
              }),
              menuList: (provided) => ({
                ...provided,
                padding: '10px 20px',
              }),
              option: (provided) => ({
                ...provided,
              }),
              singleValue: (provided) => ({
                ...provided,
                margin: 0,
                padding: 0,
              }),
              valueContainer: (provided) => ({
                ...provided,
                margin: 0,
                padding: 0,
              }),
            }}
            css={css`
              font-size: 18px;
              line-height: 21px;
              font-weight: 500;
              color: ${SECONDARY_GRAY};
            `}
          />
        </label>
        <div
          css={css`
            position: relative;
            display: flex;
          `}
        >
          <label css={fieldLabelStyle}>
            Enter amount
            <input
              type="number"
              css={css`
                box-sizing: border-box;
                width: 100%;
                font-size: 18px;
                line-height: 30px;
                font-weight: 700;
                color: ${SECONDARY_GRAY};
                padding: 10px 20px;
                border: 1px solid ${DETAIL_GRAY};
                border-radius: 4px;

                &:focus {
                  outline: 2px auto ${DARK_GRAY};
                }

                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
                &[type='number'] {
                  -moz-appearance: textfield;
                }
              `}
            />
          </label>
          <span
            css={css`
              color: ${SECONDARY_GRAY};
              font-size: 18px;
              line-height: 30px;
              font-weight: 700;
              position: absolute;
              right: 20px;
              bottom: 10px;
            `}
          >
            {SYMBOL['USD']}
          </span>
        </div>
      </div>
      <span
        css={css`
          font-size: 18px;
          font-weight: 300;
          padding: 0 35px;
          color: ${DARK_GRAY};
        `}
      >
        {`1 USD = 0.835080 EUR`}
      </span>
    </div>
  )
}
