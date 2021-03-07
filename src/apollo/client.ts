import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://swop.cx/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization:
      'ApiKey c88515ce40b5c857fbb6054c4176dd7de5632f7145e011d6abb267be5bcefa7a',
  },
})
