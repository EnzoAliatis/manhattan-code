import { AuthenticationError, UserInputError, ForbiddenError } from 'apollo-server'
import { skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { me }) => {
  return me ? skip : new ForbiddenError('Not authenticated as user')
}

export const isAdmin = (parent, args, { me }) => {
  if(me.role === 1) {
    return skip
  }
  return new ForbiddenError('Not have permision')
}