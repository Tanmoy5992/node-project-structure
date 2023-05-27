const { Sequelize, Op } = require("sequelize");
const UserModel = require("../schema/user.schema");
const UserRoleModel = require("../schema/user.role.schema");

exports.findAllData = () => {
  return UserRoleModel.findAll({
    include: [
      {
        model: UserModel,
      },
    ],
  });
};
