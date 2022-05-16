const { UNAUTHORIZED, NOT_FOUND, FORBIDDEN, BAD_REQUEST } = require('http-status');

const getErrors = (statusCode) => {
  switch (statusCode) {
    case UNAUTHORIZED:
      return {
        statusCode: UNAUTHORIZED,
        message: 'Please authenticate',
      };
    case NOT_FOUND:
      return {
        statusCode: NOT_FOUND,
        message: 'Not found',
      };
    case FORBIDDEN:
      return {
        statusCode: FORBIDDEN,
        message: 'Forbidden',
      };
    default:
      return {
        statusCode: BAD_REQUEST,
        message: 'Bad request',
      };
  }
};

class ApiError extends Error {
  constructor({ statusCode, message, isOperational = true, stack = '' }) {
    const error = getErrors(statusCode);
    super(message || error.message);
    this.statusCode = error.statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
