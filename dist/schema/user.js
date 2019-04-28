"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _default = _apolloServerExpress.gql`

  extend type Query {
    user(id: ID!): User!
    me: User!
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
    employees: [Employee]
    role: Int!
  }
`;

exports.default = _default;