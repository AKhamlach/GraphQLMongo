const express = require('express');
const connectDB = require('./database/connectionDb')
const { ApolloServer, gql} = require('apollo-server-express')
const { resolvers } = require('./src/resolver')
const { typeDefs } = require('./src/typeDefs')
const jwt = require('jsonwebtoken')
require ('dotenv').config()

//const router =require('./routes/router')

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET)
    }
    return null
  } catch (error) {
    return null
  }
}

connectDB.connect

const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.get('Authorization') || ''
      return { user : getUser(token.replace('Bearer', ''))}
    },
    introspection: true,
    playground:true
  });
 server.applyMiddleware({app})

module.exports = app;