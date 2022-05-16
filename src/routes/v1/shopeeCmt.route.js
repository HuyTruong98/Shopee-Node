/* eslint-disable no-unused-vars */
const express = require('express');
const auth = require('../../middlewares/auth');
const shopeeCmtController = require('../../controllers/shopeeCmt.controller');

const router = express.Router();

router.route('/').post(shopeeCmtController.getCmtShopee);

module.exports = router;
