"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _apolloServer = require("apollo-server");

var _graphqlResolvers = require("graphql-resolvers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createToken = async (user, secret, expiresIn) => {
  const {
    id,
    email,
    role
  } = user;
  return await _jsonwebtoken.default.sign({
    id,
    email,
    role
  }, secret, {
    expiresIn
  });
};

var _default = {
  Query: {
    user: async (parent, {
      id
    }, {
      models
    }) => {
      return await models.User.findByPk(id);
    },
    me: async (parent, args, {
      models,
      me
    }) => {
      if (!me) {
        throw new _apolloServer.AuthenticationError('Authenticate error, you must login first');
      }

      return await models.User.findByPk(me.id);
    }
  },
  Mutation: {
    signUp: async (root, {
      email,
      fullname,
      phone,
      city,
      country,
      company,
      password
    }, {
      models,
      secret
    }) => {
      let user;

      try {
        user = await models.User.create({
          email,
          fullname,
          phone,
          city,
          country,
          company,
          password
        });
      } catch (error) {
        throw new _apolloServer.UserInputError('Form user invalid or User is alredy exist');
      }

      return {
        token: createToken(user, secret, process.env.TokenTTL)
      };
    },
    signIn: async (root, {
      email,
      password
    }, {
      models,
      secret
    }) => {
      const user = await models.User.findOne({
        where: {
          email
        }
      });

      if (!user) {
        throw new _apolloServer.UserInputError('No user found with this login credentials');
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new _apolloServer.AuthenticationError('Invalid password');
      }

      return {
        token: createToken(user, secret, process.env.TokenTTL)
      };
    }
  },
  User: {
    employees: async (user, args, {
      models
    }) => {
      return await models.Employee.findAll({
        where: {
          user_id: user.id
        }
      });
    }
  }
};
exports.default = _default;