import React, { createContext, FC, useCallback, useMemo, useState } from 'react'
import { CURRENCIES_ARRAY, CURRENCY_OPTIONS } from '../constants/currency'
import { useGetExchangeRates } from '../hooks/useGetExchangeRates'

interface Option {
  label: string
  value: string
}

interface ConverterState {
  currencyA: Option
  currencyB: Option
  setCurrencyA: (opt: Option) => void
  setCurrencyB: (opt: Option) => void
  amountA: number
  amountB: number
  setAmountA: React.Dispatch<React.SetStateAction<number>>
  setAmountB: React.Dispatch<React.SetStateAction<number>>
  rates: number[]
  loading: boolean
}

const initialState: ConverterState = {
  currencyA: CURRENCY_OPTIONS[0],
  currencyB: CURRENCY_OPTIONS[1],
  setCurrencyA: () => void 0,
  setCurrencyB: () => void 0,
  amountA: 0,
  amountB: 0,
  setAmountA: () => void 0,
  setAmountB: () => void 0,
  rates: [0, 0],
  loading: false,
}

export const ConverterContext = createContext<ConverterState>(initialState)

export const ConverterContextProvider: FC = ({ children }) => {
  const [currencyA, setCurrencyA] = useState(CURRENCY_OPTIONS[0])
  const [currencyB, setCurrencyB] = useState(CURRENCY_OPTIONS[1])
  const [amountA, setAmountA] = useState(0)
  const [amountB, setAmountB] = useState(0)

  const { data, loading } = useGetExchangeRates({
    variables: {
      baseCurrency: 'USD',
      quoteCurrencies: CURRENCIES_ARRAY,
    },
  })

  const getRates = useCallback(
    (currencyValueA: string, currencyValueB: string) => {
      const quoteA =
        currencyValueA === 'USD'
          ? 1
          : data?.latest.find((item) => item.quoteCurrency === currencyValueA)
              ?.quote ?? 0
      const quoteB =
        currencyValueB === 'USD'
          ? 1
          : data?.latest.find((item) => item.quoteCurrency === currencyValueB)
              ?.quote ?? 0

      const rateA = quoteB === 0 ? 0 : quoteA / quoteB
      const rateB = quoteA === 0 ? 0 : quoteB / quoteA

      return [rateA, rateB]
    },
    [data],
  )

  const rates = useMemo(() => {
    return getRates(currencyA.value, currencyB.value)
  }, [getRates, currencyA, currencyB])

  const HandleChangeCurrencyA = useCallback(
    (opt: Option) => {
      setCurrencyA(opt)
      setAmountB(amountA * getRates(opt.value, currencyB.value)[0])
    },
    [setCurrencyA, amountA, setAmountB, getRates, currencyB],
  )

  const HandleChangeCurrencyB = useCallback(
    (opt: Option) => {
      setCurrencyB(opt)
      setAmountA(amountB * getRates(currencyA.value, opt.value)[1])
    },
    [setCurrencyB, amountB, setAmountA, getRates, currencyA],
  )

  return (
    <ConverterContext.Provider
      value={{
        currencyA,
        setCurrencyA: HandleChangeCurrencyA,
        currencyB,
        setCurrencyB: HandleChangeCurrencyB,
        amountA,
        setAmountA,
        amountB,
        setAmountB,
        rates,
        loading,
      }}
    >
      {children}
    </ConverterContext.Provider>
  )
}
