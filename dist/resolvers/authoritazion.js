"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMineEmployee = exports.isAdmin = exports.isAuthenticated = void 0;

var _apolloServer = require("apollo-server");

var _graphqlResolvers = require("graphql-resolvers");

const isAuthenticated = (parent, args, {
  me
}) => {
  return me ? _graphqlResolvers.skip : new _apolloServer.ForbiddenError('Not authenticated as user');
};

exports.isAuthenticated = isAuthenticated;

const isAdmin = (parent, args, {
  me
}) => {
  if (me.role === 1) {
    return _graphqlResolvers.skip;
  }

  return new _apolloServer.ForbiddenError('Not have permision');
};

exports.isAdmin = isAdmin;

const isMineEmployee = async (parent, {
  id
}, {
  me,
  models
}) => {
  const employee = await models.Employee.findByPk(id, {
    raw: true
  });

  if (employee.userId !== me.id) {
    return new _apolloServer.ForbiddenError(`Employee with id:${employee.id} is not yours`);
  }

  return _graphqlResolvers.skip;
};

exports.isMineEmployee = isMineEmployee;