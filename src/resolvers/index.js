import { GraphQLDateTime } from 'graphql-iso-date';

import usersResolvers from './user'
import employeeResolvers from './employee'

const customScalarResolver = {
  Date: GraphQLDateTime
}

export default [
  customScalarResolver,
  usersResolvers,
  employeeResolvers
]