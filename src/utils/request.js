const Axios = require('axios');

const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // store.dispatch();
      // dispatch logout
    }
    return error.response.data;
    // return Promise.reject(error);
  }
);

const request = ({ url = '', method = undefined, data = {}, params = {} }) => {
  const options = { url, method };
  if (method !== 'GET') {
    options.data = JSON.stringify(data);
  }

  if (params) {
    options.params = params;
  }
  return axios(options);
};

module.exports = {
  request,
};
