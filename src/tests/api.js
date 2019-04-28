import axios from 'axios';

const API_URL = 'http://localhost:8000/graphql';

export const user = async variables =>
  axios.post(API_URL, {
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
    variables,
  });

export const signIn = async variables =>
  await axios.post(API_URL, {
    query: `
    mutation ($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        token
      }
    }
  `,
    variables,
  });

export const me = async token =>
  await axios.post(
    API_URL,
    {
      query: `
        {
          me {
            email
          }
        }
      `,
    },
    token
      ? {
          headers: {
            authorization: token,
          },
        }
      : null
  );

export const singnUp = async variables => {
  return await axios.post(API_URL, {
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
    variables,
  });
};
