/* eslint-disable no-unused-vars */
const express = require('express');
const auth = require('../../middlewares/auth');
const shopeeController = require('../../controllers/shopee.controller');

const router = express.Router();

router.route('/').post(shopeeController.getItemShopee);

module.exports = router;
