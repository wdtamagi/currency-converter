import { useQuery, gql, QueryHookOptions } from '@apollo/client'

export const EXCHANGE_RATES = gql`
  query GetExchangeRates($baseCurrency: String, $quoteCurrencies: [String!]) {
    latest(baseCurrency: $baseCurrency, quoteCurrencies: $quoteCurrencies) {
      baseCurrency
      quoteCurrency
      quote
    }
  }
`

interface Rate {
  baseCurrency: string
  quoteCurrency: string
  quote: number
}
interface Result {
  latest: Rate[]
}
interface Variables {
  baseCurrency: string
  quoteCurrencies: Array<string>
}

export const useGetExchangeRates = (
  options?: QueryHookOptions<Result, Variables>,
) => {
  return useQuery<Result, Variables>(EXCHANGE_RATES, { ...options })
}
