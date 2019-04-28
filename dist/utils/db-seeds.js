"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateEmployees = exports.generateUsers = void 0;

var _faker = _interopRequireDefault(require("faker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generateUsers = async (num, model) => {
  await model.create({
    email: 'enzo@aliatis.com',
    fullname: 'Enzo Aliatis',
    password: 'enzoenzo',
    phone: '0989730005',
    city: 'manta',
    country: 'Ecuador',
    company: 'Ducktyping'
  });

  for (let i = 0; i < num - 1; i++) {
    await model.create({
      email: _faker.default.internet.email(),
      fullname: _faker.default.name.findName(),
      password: _faker.default.internet.password(),
      phone: _faker.default.phone.phoneNumber(),
      city: _faker.default.address.city(),
      country: _faker.default.address.country(),
      company: _faker.default.company.companyName()
    });
  }

  console.log('|-----------------------SEEDS----SUCCESSFUL-----------------------|');
};

exports.generateUsers = generateUsers;

const generateEmployees = async (num, model) => {
  await model.create({
    fullname: 'Leonel Messi',
    password: 'mesimesi',
    phone: '0999999999',
    role: 2,
    userId: 1
  });

  for (let i = 0; i < num - 1; i++) {
    await model.create({
      fullname: _faker.default.name.findName(),
      password: _faker.default.internet.password(),
      phone: _faker.default.phone.phoneNumber(),
      role: Math.floor(Math.random() * (3 - 2 + 1) + 2),
      userId: Math.floor(Math.random() * (5 - 1 + 1) + 1)
    });
  }

  console.log('|-----------------------SEEDS----SUCCESSFUL-----------------------|');
};

exports.generateEmployees = generateEmployees;