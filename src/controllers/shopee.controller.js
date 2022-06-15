const { domainShopee } = require('../config/config');
const ApiSusscess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { request } = require('../utils/request');

const getItemShopee = catchAsync(async (req, res) => {
  const { query } = req.body;
  const response = await request({
    url: `${domainShopee}/api/v4/search/search_items?${query}`,
  });

  const newRes = [];
  const total = {
    sold: 0,
    stock: 0,
    liked_count: 0,
    cmt_count: 0,
    rating_star: 0,
    totalShowInMonth: 0,
  };
  if (response.items.length > 0 && response.items.length === 100)
    response.items.forEach((item) => {
      if (item) {
        total.sold += item.item_basic.sold;
        total.stock += item.item_basic.stock;
        total.liked_count += item.item_basic.liked_count;
        total.cmt_count += item.item_basic.cmt_count;
        total.rating_star += item.item_basic.item_rating.rating_star;
        const newItem = {
          name: item.item_basic.name,
          discount: item.item_basic.discount,
          sold: item.item_basic.sold,
          stock: item.item_basic.stock,
          cmt_count: item.item_basic.cmt_count,
          liked_count: item.item_basic.liked_count,
          rating_star: item.item_basic.item_rating.rating_star,
          image: item.item_basic.image,
          ctime: item.item_basic.ctime,
          shopid: item.item_basic.shopid,
          itemid: item.item_basic.itemid,
          price: item.item_basic.price,
          currency: item.item_basic.currency,
        };
        newRes.push(newItem);
      }
    });
  return new ApiSusscess({
    res,
    data: {
      data: newRes,
      total,
    },
  });
});

module.exports = {
  getItemShopee,
};
