import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    myEmployee(id: ID!): Employee!
    myEmployees: [Employee]
  }


  extend type Mutation {
    employee_signUp(
      fullname: String!
      phone: String!
      password: String!
      role: Int!
    ): Token!

    employee_signIn(
      fullname: String!
      password: String!
    ): Token!
  }


  type Employee {
    role: Int!
    fullname: String!
    phone: String!
  }
`