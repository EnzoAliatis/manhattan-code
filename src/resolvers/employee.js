import jwt from "jsonwebtoken";
import { combineResolvers } from "graphql-resolvers";

import { isAuthenticated, isAdmin } from "./authoritazion";

const createToken = async (employee, secret, expiresIn) => {
  const { id, fullname, role } = employee;
  return await jwt.sign({ id, fullname, role }, secret, { expiresIn });
};

export default {
  Query: {
    myEmployee: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (parent, { id }, { models, me }) => {
        return await models.Employee.findOne({
          where: {
            id,
            userId: me.id
          }
        });
      }
    ),
    myEmployees: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (parent, args, { models, me }) => {
        return await models.Employee.findAll({
          where: {
            userId: me.id
          }
        });
      }
    )
  },

  Mutation: {
    employee_signUp: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (
        parent,
        { fullname, phone, password, role },
        { models, me, secret }
      ) => {
        const employee = await models.Employee.create({
          fullname,
          phone,
          password,
          role,
          userId: me.id
        });
        return { token: createToken(employee, secret, "30m") };
      }
    ),
    employee_signIn: async (parent, { fullname, password }, { models, secret }) => {
      const employee = await models.Employee.findOne({ where: { fullname }})

      if (!employee) {
        throw new UserInputError('No user found with this login credentials')
      }

      const isValid = await employee.validatePassword(password)

      if (!isValid) {
        throw new AuthenticationError('Invalid password')
      }

      return { token: createToken(employee, secret, '30m')}
    }
  }
};
