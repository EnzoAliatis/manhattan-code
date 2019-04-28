"use strict";

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _http = _interopRequireDefault(require("http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _schema = _interopRequireDefault(require("./schema"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _models = _interopRequireWildcard(require("./models"));

var _utilsServer = require("./utils/utils-server");

var _dbSeeds = require("./utils/db-seeds");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
const server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema.default,
  resolvers: _resolvers.default,
  formatError: error => {
    const message = error.message.replace('SequelizeValidationError: ', '').replace('Validation error: ', '');
    return { ...error,
      message
    };
  },
  context: async ({
    req
  }) => {
    const me = await (0, _utilsServer.getMe)(req, _jsonwebtoken.default, _apolloServerExpress.AuthenticationError);
    return {
      models: _models.default,
      me,
      secret: process.env.SECRET
    };
  }
});
server.applyMiddleware({
  app,
  path: '/graphql'
});
app.get('/', (req, res) => {
  res.send('I am alive');
});

const httpServer = _http.default.createServer(app);

server.installSubscriptionHandlers(httpServer);
console.log(process.env.NODE_ENV); // const isTest = process.env.NODE_ENV === 'test' ? true : false

const isTest = true;

_models.sequelize.sync({
  force: isTest
}).then(async () => {
  if (isTest) {
    await (0, _dbSeeds.generateUsers)(5, _models.default.User);
    await (0, _dbSeeds.generateEmployees)(5, _models.default.Employee);
  }

  httpServer.listen({
    port: 8000
  }, () => {
    console.log('Apollo server on http://localhost:8000/graphql');
  });
});