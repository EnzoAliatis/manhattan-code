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
    ): Employee!

    employee_signIn(
      fullname: String!
      password: String!
    ): Token!

    delete_my_employee(id: ID!): Boolean!
  }


  type Employee {
    id: ID!
    role: Int!
    fullname: String!
    phone: String!
  }
`