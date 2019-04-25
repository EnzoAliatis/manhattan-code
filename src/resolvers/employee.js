import jwt from "jsonwebtoken";
import { combineResolvers } from "graphql-resolvers";

import { isAuthenticated, isAdmin, isMineEmployee } from "./authoritazion";

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
        return employee
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
    },

    delete_my_employee: combineResolvers(
      isAuthenticated,
      isAdmin,
      isMineEmployee,
      async (
        parent,
        { id },
        { models }
      ) => {
        return await models.Employee.destroy({
          where: {
            id
          }
        })
      }
    ),

    update_my_employee: combineResolvers(
      isAuthenticated,
      isAdmin,
      isMineEmployee,
      async (
        parent,
        { id, fullname, phone, role },
        { models }
      ) => {
        const employee = await models.Employee.findByPk(id)
        console.log(phone)
        employee.update({ fullname, phone, role })
          .then(() => true)
          .catch(() => false)
      }
    )
  }
};
