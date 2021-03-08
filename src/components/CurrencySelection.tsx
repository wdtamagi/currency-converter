/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { FC, useCallback, useContext } from 'react'
import Select from 'react-select'

import {
  DARK_GRAY,
  DETAIL_GRAY,
  LIGHT_GRAY,
  SECONDARY_GRAY,
} from '../constants/colors'
import { CURRENCY_OPTIONS, SYMBOL } from '../constants/currency'
import { ConverterContext } from '../context/ConverterContext'

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

interface CurrencySelectionProp {
  selectionType: 'A' | 'B'
}
export const CurrencySelection: FC<CurrencySelectionProp> = ({
  selectionType,
}) => {
  const {
    currencyA,
    setCurrencyA,
    currencyB,
    setCurrencyB,
    amountA,
    setAmountA,
    amountB,
    setAmountB,
    rates,
    loading,
  } = useContext(ConverterContext)

  const currentValue = selectionType === 'A' ? currencyA : currencyB
  const opositeValue = selectionType === 'A' ? currencyB : currencyA
  const currentAmount = selectionType === 'A' ? amountA : amountB
  const setCurrentAmount = selectionType === 'A' ? setAmountA : setAmountB
  const setOpositeAmount = selectionType === 'A' ? setAmountB : setAmountA

  const rate = rates[selectionType === 'A' ? 0 : 1]

  const handleAmountChange = useCallback(
    (e) => {
      setCurrentAmount(Number(e.target.value))
      setOpositeAmount(Number(e.target.value) * rate)
    },
    [setCurrentAmount, setOpositeAmount, rate],
  )

  return (
    <div
      data-testid={
        selectionType === 'A' ? 'selection-wrapper-a' : 'selection-wrapper-b'
      }
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
            value={currentValue}
            onChange={(value) => {
              if (value !== null) {
                selectionType === 'A'
                  ? setCurrencyA(value)
                  : setCurrencyB(value)
              }
            }}
            isOptionDisabled={(option) => option.value === opositeValue.value}
            options={CURRENCY_OPTIONS}
            isClearable={false}
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
              data-testid={selectionType === 'A' ? 'input-a' : 'input-b'}
              value={currentAmount.toString()}
              onChange={handleAmountChange}
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
            {SYMBOL[currentValue.value]}
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
        {loading
          ? 'Loading...'
          : `1 ${currentValue.value} = ${rate} ${opositeValue.value}`}
      </span>
    </div>
  )
}
