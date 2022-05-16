const { NO_CONTENT, OK } = require('http-status');

class ApiSusscess {
  constructor({ res, statusCode, data }) {
    if (data.length === 0) res.status(NO_CONTENT).json();
    else res.status(statusCode || OK).json(data);
  }
}

module.exports = ApiSusscess;
