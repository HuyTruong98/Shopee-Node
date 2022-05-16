const { ROLE_USER, ROLE_ADMIN } = require('../utils/contants');

const roles = [ROLE_USER, ROLE_ADMIN];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};
