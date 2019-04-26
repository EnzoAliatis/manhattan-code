import jwt from 'jsonwebtoken'

import { AuthenticationError, UserInputError } from 'apollo-server'
import { combineResolvers } from 'graphql-resolvers'


const createToken = async (user, secret, expiresIn) => {
  const { id, email, role } = user
  return await jwt.sign({ id, email, role }, secret, { expiresIn })
}

export default {
  Query: {
    user: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id)
    },
    me: async (parent, args, { models, me }) => {
      if (!me) {
        throw new AuthenticationError('Authenticate error, you must login first')
      } 
      return await models.User.findByPk(me.id)
    }
  },

  Mutation: {
    signUp: async (root,
      { email, fullname, phone, city, country, company, password },
      { models, secret }
    ) => {
      let user
      try {
        user = await models.User.create({
          email, fullname, phone, city, country, company, password,
        }) 
      } catch (error) {
        throw new UserInputError('Form user invalid')
      }
      return { token: createToken(user, secret, process.env.TokenTTL)}
    },

    signIn: async (root, { email, password }, { models, secret }) => {
      const user = await models.User.findOne({ where: { email } })

      if (!user) {
        throw new UserInputError('No user found with this login credentials')
      }

      const isValid = await user.validatePassword(password)

      if (!isValid) {
        throw new AuthenticationError('Invalid password')
      }

      return { token: createToken(user, secret, process.env.TokenTTL)}
    }
  },

  User: {
    employees: async (user, args, { models }) => {
      return await models.Employee.findAll({
        where: {
          user_id: user.id
        }
      })
    }
  },
}