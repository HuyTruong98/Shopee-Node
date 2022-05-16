const { domainShoppee } = require('../config/config');
const ApiSusscess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { request } = require('../utils/request');

const getItemShopee = catchAsync(async (req, res) => {
  const { query } = req.body;
  const response = await request({
    url: `${domainShoppee}/api/v4/search/search_items?${query}`,
  });
  return new ApiSusscess({ res, data: response });
});

module.exports = {
  getItemShopee,
};
