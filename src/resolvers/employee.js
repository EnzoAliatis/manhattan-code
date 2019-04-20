import jwt from 'jsonwebtoken'

import { AuthenticationError, UserInputError } from 'apollo-server'

const createToken = async (employee, secret, expiresIn) => {
  const { id, fullname, role } = employee
  return await jwt.sign({ id, fullname, role }, secret, { expiresIn })
}

export default {
  Query: {
    employee: async (parent, { id }, { models }) => {
      return await models.Employee.findByPk(id)
    }
  }
}