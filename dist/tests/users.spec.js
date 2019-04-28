"use strict";

var _chai = require("chai");

var _faker = _interopRequireDefault(require("faker"));

var userApi = _interopRequireWildcard(require("./api"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('users', () => {
  describe('user(id: String!): User', () => {
    it('return a user when user can be found', async () => {
      const expectedResult = {
        data: {
          user: {
            email: 'enzo@aliatis.com',
            fullname: 'Enzo Aliatis',
            phone: '0989730005',
            city: 'manta',
            country: 'Ecuador',
            company: 'Ducktyping',
            role: 1
          }
        }
      };
      const result = await userApi.user({
        id: 1
      });
      (0, _chai.expect)(result.data).to.eql(expectedResult);
    });
    it('returns null when user cannot be found', async () => {
      const expectedResult = {
        data: {
          user: null
        }
      };
      const result = await userApi.user({
        id: '42'
      });
      (0, _chai.expect)(result.data.data).to.eql(expectedResult.data.user);
    });
  });
  describe('me: User', () => {
    it('return null when no user is login', async () => {
      const expectedResult = null;
      const data = await userApi.me();
      (0, _chai.expect)(data.data.data).to.eql(expectedResult);
    });
    it('return me when me is login', async () => {
      const expectedResult = {
        data: {
          me: {
            email: 'enzo@aliatis.com'
          }
        }
      };
      const {
        data: {
          data: {
            signIn: {
              token
            }
          }
        }
      } = await userApi.signIn({
        email: 'enzo@aliatis.com',
        password: 'enzoenzo'
      });
      const data = await userApi.me(token);
      (0, _chai.expect)(data.data).to.eql(expectedResult);
    });
  });
  describe('signUp(): Token!', () => {
    const fake = {
      email: _faker.default.internet.email(),
      fullname: 'cristiano ronaldo',
      phone: '099999999',
      city: 'Manta',
      country: 'Portugal',
      company: 'CR7 AS',
      password: 'Siiiiiiiiiuuuuu'
    };
    it('return a token when user SignUp', async () => {
      let data = await userApi.singnUp(fake);
      const me = await userApi.me(data.data.data.signUp.token);
      (0, _chai.expect)(me.data.data.me.email).to.eql(fake.email);
    });
    it('return null when the email is already exists', async () => {
      let data = await userApi.singnUp(fake);
      (0, _chai.expect)(data.data.data).to.be.null;
    });
  });
});