"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMe = void 0;

const getMe = async (req, jwt, err) => {
  const token = req.headers["authorization"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (error) {
      throw new err('Your session expired, Sign In again');
    }
  }
};

exports.getMe = getMe;