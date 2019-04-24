import jwt from 'jsonwebtoken'
import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authoritazion'

const createToken = async (employee, secret, expiresIn) => {
  const { id, fullname, role } = employee
  return await jwt.sign({ id, fullname, role }, secret, { expiresIn })
}

export default {
  Query: {
    employee: async (parent, { id }, { models }) => {
      return await models.Employee.findByPk(id)
    }
  },

  Mutation: {
    employee_signUp: combineResolvers(
      isAuthenticated,
      async (parent, { fullname, phone, password, role }, { models, me, secret }) => {
        const employee = await models.Employee.create({
          fullname, phone, password, role, userId: me.id 
        })
        return { token: createToken(employee, secret, '30m')}
      }
    )
  }
}