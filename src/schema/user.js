import { gql } from 'apollo-server-express'

export default gql`

  extend type Query {
    user(id: ID!): User!
    me: Me
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
    ): Token!

    signIn(
      email: String!
      password: String!
    ): Token!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    email: String!
    fullname: String!  
    phone: String!
    city: String!
    country: String!
    company: String!
    employees: [Employee!]
    role: Int!
  }

  union Me = User | Employee
`