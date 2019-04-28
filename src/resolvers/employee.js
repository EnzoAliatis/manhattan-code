import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { ApolloError } from 'apollo-server';

import {
  isAuthenticated,
  isAdmin,
  isMineEmployee,
} from './authoritazion';

const createToken = async (employee, secret, expiresIn) => {
  const { id, fullname, role } = employee;
  return await jwt.sign({ id, fullname, role }, secret, {
    expiresIn,
  });
};

export default {
  Query: {
    myEmployee: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (parent, { id }, { models, me }) => {
        let employee;
        try {
          employee = await models.Employee.findOne({
            where: {
              id,
              userId: me.id,
            },
          });
          if (!employee) {
            throw new ApolloError(
              'You dont have Employee with this id'
            );
          }
          return employee;
        } catch (error) {
          throw new ApolloError(
            'Error finding my employee, please try again',
            error
          );
        }
      }
    ),
    myEmployees: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (parent, args, { models, me }) => {
        try {
          return await models.Employee.findAll({
            where: {
              userId: me.id,
            },
          });
        } catch (error) {
          throw new ApolloError(
            'Error finding my employees, please try again'
          );
        }
      }
    ),
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
        try {
          await models.Employee.create({
            fullname,
            phone,
            password,
            role,
            userId: me.id,
          });
        } catch (error) {
          throw new ApolloError(
            'Error signin employee, please try againt latter'
          );
        }
      }
    ),
    employee_signIn: async (
      parent,
      { fullname, password },
      { models, secret }
    ) => {
      const employee = await models.Employee.findOne({
        where: { fullname },
      });

      if (!employee) {
        throw new UserInputError(
          'No user found with this login credentials'
        );
      }

      const isValid = await employee.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password');
      }

      return { token: createToken(employee, secret, '30m') };
    },

    delete_my_employee: combineResolvers(
      isAuthenticated,
      isAdmin,
      isMineEmployee,
      async (parent, { id }, { models }) => {
        return await models.Employee.destroy({
          where: {
            id,
          },
        });
      }
    ),

    update_my_employee: combineResolvers(
      isAuthenticated,
      isAdmin,
      isMineEmployee,
      async (parent, { id, fullname, phone, role }, { models }) => {
        const employee = await models.Employee.findByPk(id);
        console.log(phone);
        employee
          .update({ fullname, phone, role })
          .then(() => true)
          .catch(() => false);
      }
    ),
  },
};
