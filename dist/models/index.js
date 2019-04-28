"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.sequelize = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let sequelize;
exports.sequelize = sequelize;
const timezone = '+05:00';

if (process.env.NODE_ENV === 'production') {
  exports.sequelize = sequelize = new _sequelize.default(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DATABASE_END_POINT
  });
} else {
  exports.sequelize = sequelize = new _sequelize.default({
    database: 'manhattan-test',
    username: 'postgres',
    password: 'docker',
    host: 'localhost',
    dialect: 'postgres'
  });
}

const models = {
  User: sequelize.import('./user'),
  Employee: sequelize.import('./employee') // "En el mismo archivo,
  // puede asociar físicamente todos sus modelos entre sí para exponerlos
  //  a su aplicación como capa de acceso a datos (modelos) para la base de datos"

};
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});
var _default = models;
exports.default = _default;