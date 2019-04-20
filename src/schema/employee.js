import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    employee(id: ID!): Employee!
  }


  extend type Mutation {
    employee_signUp(
      fullname: String!
      phone: String!
      password: String!
      role: Int!
    ): Token!

    employee_signIn(
      email: String!
      password: String!
    ): Token!
  }


  type Employee {
    role: Int!
    fullname: String!
    phone: String!
    password: String!
  }
`