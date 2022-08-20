import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import "reflect-metadata"
import express from 'express'
import { createServer } from "http"
import { buildSchema } from 'type-graphql'
import { __isProd__ } from './constant'
import { HelloResolver } from './resolvers/hello'
import { WebSocketServer } from 'ws'
import {  useServer } from 'graphql-ws/lib/use/ws'
import { MessageResolver } from './resolvers/message'

const main = async () => {
    //  schema
    let schema = await buildSchema({
        resolvers: [HelloResolver, MessageResolver],
        validate: false
    })

    const app = express()
    // httpServer
    const httpServer = createServer(app)
    // ws-server
    const wsServer = new WebSocketServer({
       server: httpServer,
       path: '/graphql'
    })

    const serverCleanup = useServer({ schema }, wsServer);

    // apollo-server
    const apolloServer = new ApolloServer({
        schema,
        cache: "bounded",
        plugins: [
          __isProd__ ? ApolloServerPluginLandingPageProductionDefault() : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
          // proper way to close connection
          ApolloServerPluginDrainHttpServer({ httpServer }),
          {
            async serverWillStart() {
              return {
                async drainServer() {
                  await serverCleanup.dispose();
                },
              };
            },
          },
        ]
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app })
   
    // port
    const PORT = 4000
    httpServer.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT}${apolloServer.graphqlPath}...`)
    })
}

main().catch((err: any) => {
    console.log(err.message)
})