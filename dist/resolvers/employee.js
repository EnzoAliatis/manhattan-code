"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _graphqlResolvers = require("graphql-resolvers");

var _apolloServer = require("apollo-server");

var _authoritazion = require("./authoritazion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createToken = async (employee, secret, expiresIn) => {
  const {
    id,
    fullname,
    role
  } = employee;
  return await _jsonwebtoken.default.sign({
    id,
    fullname,
    role
  }, secret, {
    expiresIn
  });
};

var _default = {
  Query: {
    myEmployee: (0, _graphqlResolvers.combineResolvers)(_authoritazion.isAuthenticated, _authoritazion.isAdmin, async (parent, {
      id
    }, {
      models,
      me
    }) => {
      let employee;

      try {
        employee = await models.Employee.findOne({
          where: {
            id,
            userId: me.id
          }
        });

        if (!employee) {
          throw new _apolloServer.ApolloError('You dont have Employee with this id');
        }

        return employee;
      } catch (error) {
        throw new _apolloServer.ApolloError('Error finding my employee, please try again', error);
      }
    }),
    myEmployees: (0, _graphqlResolvers.combineResolvers)(_authoritazion.isAuthenticated, _authoritazion.isAdmin, async (parent, args, {
      models,
      me
    }) => {
      try {
        return await models.Employee.findAll({
          where: {
            userId: me.id
          }
        });
      } catch (error) {
        throw new _apolloServer.ApolloError('Error finding my employees, please try again');
      }
    })
  },
  Mutation: {
    employee_signUp: (0, _graphqlResolvers.combineResolvers)(_authoritazion.isAuthenticated, _authoritazion.isAdmin, async (parent, {
      fullname,
      phone,
      password,
      role
    }, {
      models,
      me,
      secret
    }) => {
      try {
        await models.Employee.create({
          fullname,
          phone,
          password,
          role,
          userId: me.id
        });
      } catch (error) {
        throw new _apolloServer.ApolloError('Error signin employee, please try againt latter');
      }
    }),
    employee_signIn: async (parent, {
      fullname,
      password
    }, {
      models,
      secret
    }) => {
      const employee = await models.Employee.findOne({
        where: {
          fullname
        }
      });

      if (!employee) {
        throw new UserInputError('No user found with this login credentials');
      }

      const isValid = await employee.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password');
      }

      return {
        token: createToken(employee, secret, '30m')
      };
    },
    delete_my_employee: (0, _graphqlResolvers.combineResolvers)(_authoritazion.isAuthenticated, _authoritazion.isAdmin, _authoritazion.isMineEmployee, async (parent, {
      id
    }, {
      models
    }) => {
      return await models.Employee.destroy({
        where: {
          id
        }
      });
    }),
    update_my_employee: (0, _graphqlResolvers.combineResolvers)(_authoritazion.isAuthenticated, _authoritazion.isAdmin, _authoritazion.isMineEmployee, async (parent, {
      id,
      fullname,
      phone,
      role
    }, {
      models
    }) => {
      const employee = await models.Employee.findByPk(id);
      console.log(phone);
      employee.update({
        fullname,
        phone,
        role
      }).then(() => true).catch(() => false);
    })
  }
};
exports.default = _default;