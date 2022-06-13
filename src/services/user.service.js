const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { dataPermited } = require('../utils/helpers');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError({ statusCode: httpStatus.BAD_REQUEST, message: 'Email already taken' });
  }
  const user = await User.create(userBody);
  return user;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const permiteds = ['name', 'picture', 'password'];
  const data = dataPermited(updateBody, permiteds);
  const newBody = {
    ...data,
  };
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError({ statusCode: httpStatus.NOT_FOUND });
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError({ statusCode: httpStatus.BAD_REQUEST, message: 'Email already taken' });
  }
  Object.assign(user, newBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError({ statusCode: httpStatus.NOT_FOUND });
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
