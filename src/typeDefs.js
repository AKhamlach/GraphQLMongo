const { gql } = require('apollo-server-express')
//const { Things } =require('./models/thing')

exports.typeDefs = gql`

type Query {
    things: [Thing!]
    getThingById(id:ID!): Thing!

    allUsers: [User!]
    user(id:ID!): User
    me: User
}

type Thing {
    id: ID!
    title: String!
    description: String!
    imageUrl: String!
    userID: String!
    price: Float!
}

type User{
    id: ID!
    username: String!
    email: String!
    password: String!
}

type AuthPayload {
    token: String!
    user: User!
  }


type Mutation {
    createThing(
        title: String!
        description: String
        imageUrl: String
        userId: String
        price: Int
    ) : Thing!
       
    setThing(
        id: ID!
        title: String!
        description: String!
        imageUrl: String!
        userId: String!
        price: Int!
    ) : Boolean!

    deleteThing(id: ID!): Boolean!

    registerUser(
        username: String!,
        email: String!, 
        password: String!
    ): AuthPayload!

    setUser(
        id: ID!
        username: String!
        email: String!
        password: String!
    ) : Boolean!
    
    deleteUser(id: ID!): Boolean!

    login (username: String!, password: String!): AuthPayload!
}
`;