"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singnUp = exports.me = exports.signIn = exports.user = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const API_URL = 'http://localhost:8000/graphql';

const user = async variables => _axios.default.post(API_URL, {
  query: `
    query($id: ID!) {
      user(id: $id) {
        email
        fullname
        phone
        city
        country
        company
        role
      }
    }
  `,
  variables
});

exports.user = user;

const signIn = async variables => await _axios.default.post(API_URL, {
  query: `
    mutation ($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        token
      }
    }
  `,
  variables
});

exports.signIn = signIn;

const me = async token => await _axios.default.post(API_URL, {
  query: `
        {
          me {
            email
          }
        }
      `
}, token ? {
  headers: {
    authorization: token
  }
} : null);

exports.me = me;

const singnUp = async variables => {
  return await _axios.default.post(API_URL, {
    query: `
    mutation(
      $email: String!,
      $fullname: String!, 
      $phone: String!, 
      $city: String!,
      $country: String!, 
      $company: String!
      $password: String!
    ) { 
        signUp(
          email: $email
          fullname: $fullname
          phone: $phone
          city: $city 
          country: $country
          company: $company
          password: $password
        ) {
        token
        }
      }
      `,
    variables
  });
};

exports.singnUp = singnUp;