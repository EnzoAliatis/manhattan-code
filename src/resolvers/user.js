import { combineResolvers } from 'graphql-resolvers'

export default {
  Query: {
    user: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id)
    }
  },

  Mutation: {
    signUp: async (
      root,
      {
      email,
      fullname,
      phone,
      city,
      country,
      company,
      password,
      }, {
        models
      }
    ) => {
      const user = await models.User.create({
        email,
        fullname,
        phone,
        city,
        country,
        company,
        password,
      })
      return user
    }
  }
}