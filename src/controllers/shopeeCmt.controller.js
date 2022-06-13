const { domainShopee } = require('../config/config');
const ApiSusscess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { request } = require('../utils/request');

const getCmtShopee = catchAsync(async (req, res) => {
  const { query } = req.body;
  const response = await request({
    url: `${domainShopee}/api/v2/item/get_ratings?${query}`,
  });
  return new ApiSusscess({ res, data: response });
});

module.exports = {
  getCmtShopee,
};
