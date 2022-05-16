const httpStatus = require('http-status');
const { CREATED } = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const ApiSusscess = require('../utils/ApiSuccess');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  return new ApiSusscess({ res, statusCode: CREATED, data: user });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError({ statusCode: httpStatus.NOT_FOUND, message: 'User not found' });
  }
  return new ApiSusscess({ res, data: user });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  return new ApiSusscess({ res, data: user });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  return new ApiSusscess({ res });
});

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
