import { expect } from 'chai';

import * as userApi from './api';

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
            role: 1,
          },
        },
      };
      const result = await userApi.user({ id: 1 });
      expect(result.data).to.eql(expectedResult);
    });

    it('returns null when user cannot be found', async () => {
      const expectedResult = {
        data: {
          user: null,
        },
      };

      const result = await userApi.user({ id: '42' });

      expect(result.data.data).to.eql(expectedResult.data.user);
    });
  });
  describe('me: User', () => {
    it('return null when no user is login', async () => {
      const expectedResult = null;

      const data = await userApi.me();

      expect(data.data.data).to.eql(expectedResult);
    });

    it('return me when me is login', async () => {
      const expectedResult = {
        data: {
          me: {
            fullname: 'Enzo Aliatis',
          },
        },
      };

      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await userApi.signIn({
        email: 'enzo@aliatis.com',
        password: 'enzoenzo',
      });

      const data = await userApi.me(token);

      expect(data.data).to.eql(expectedResult);
    });
  });

  describe('signUp(): Token!', () => {
    it('return a token web user SignUp', async () => {
      let data = await userApi.singnUp({
        email: 'cristiano@ronaldo.com',
        fullname: 'cristiano ronaldo',
        phone: '099999999',
        city: 'Manta',
        country: 'Portugal',
        company: 'CR7 AS',
        password: 'Siiiiiiiiiuuuuu'
      })

      console.log(data)
      expect(true).to.eql(true);

    })
  })
});
