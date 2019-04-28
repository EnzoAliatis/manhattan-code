"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlIsoDate = require("graphql-iso-date");

var _user = _interopRequireDefault(require("./user"));

var _employee = _interopRequireDefault(require("./employee"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const customScalarResolver = {
  Date: _graphqlIsoDate.GraphQLDateTime
};
var _default = [customScalarResolver, _user.default, _employee.default];
exports.default = _default;