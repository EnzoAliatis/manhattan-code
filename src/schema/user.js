import { gql } from 'apollo-server-express'

export default gql`

  extend type Query {
    user(id: ID!): User
    # me: User
  }

  extend type Mutation {
    signUp(
      email: String!
      fullname: String!
      phone: String!
      city: String!
      country: String!
      company: String!
      password: String!
    ): User!

    signIn(
      email: String!
      password: String!
    ): Token!
  }

  type Token {
    token: String!
  }

  type Employee {
    role: Int!
    fullname: String!
    phone: String!
    password: String!
  }

  type User {
    id: ID!
    email: String!
    fullname: String!  
    phone: String!
    city: String!
    country: String!
    company: String!
    # employees: [Employee!]
    role: Int!
  }
`