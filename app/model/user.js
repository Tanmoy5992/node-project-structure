const { Sequelize, Op } = require("sequelize");
const UserModel = require("../schema/user.schema");
const UserRoleModel = require("../schema/user.role.schema");
const RoleModel = require("../schema/role.schema");
const UserWorkspaceModel = require("../schema/user.workspace.schema");
const WorkspaceModel = require("../schema/workspace");

exports.findByAny = (dataobj) => {
  return UserModel.findOne(dataobj);
};

exports.addNewRecord = (dataobj) => {
  return UserModel.create(dataobj);
};

exports.getAllRecord = (search_str, pageLimit, offset) => {
  return UserModel.findAndCountAll({
    order: [["userID", "DESC"]],
    limit: pageLimit,
    offset: offset,
  });
};

exports.updateAnyRecord = (updatedata, wheredata = {}) => {
  return UserModel.update(updatedata, wheredata);
};

exports.findAllData = () => {
  return UserModel.findAll({
    include: [
      {
        model: RoleModel,
      },
        {
          model: WorkspaceModel,
        },
    ],
  });
};
