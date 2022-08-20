import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
import { createClient as createWSClient } from 'graphql-ws';
import { WebSocket } from 'isomorphic-ws';
import { AppProps } from 'next/app';
import { createClient, defaultExchanges, Provider, Query, subscriptionExchange } from 'urql';
import { MessagesDocument, NewMessageSubscription, MessagesQuery } from '../src/generated/graphql';
import '../styles/globals.css';

function customUpdateQuery<Result, Query>(cache: Cache, qi: QueryInput, result: any, fn: (r: Result, q: Query)=> Query){
  cache.updateQuery(qi, (data)=> fn(result, data as any) as any)
}

const wsClient = createWSClient({
    url: 'ws://localhost:4000/graphql',
    webSocketImpl: WebSocket
});
const client = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink) => ({
          unsubscribe: wsClient.subscribe(operation, sink),
        }),
      }),
    }),
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <Provider value={client}>
         <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
