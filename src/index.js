import 'dotenv/config';
import cors from 'cors'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import http from 'http'


import schema from './schema'
import resolvers from './resolvers'
import models, { sequelize } from './models'

import { generateUsers, generateEmployees } from '../utils/db-seeds'

const app = express()

app.use(cors())


const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '')
    return {
      ...error,
      message
    }
  },
  context: {
    models,
    // me: models.users[1]
    secret: process.env.SECRET
  }
})

server.applyMiddleware({ app, path: '/graphql'})

app.get('/', (req, res) => {
  res.send('I am alive')
})


const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

const isTest = process.env.NODE_ENV === 'test' ? true : false


sequelize.sync({
  force: isTest
}).then(async () => {
  if(isTest) {
    await generateUsers(5,models.User)
    await generateEmployees(5, models.Employee)
  } else {
    // Elminate on production
    await generateUsers(5,models.User)
    await generateEmployees(5, models.Employee)
  }
  
  httpServer.listen({ port: 8000 }, () => {
    console.log('Apollo server on http://localhost:8000/graphql')
  })
})


