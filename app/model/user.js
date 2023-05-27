const { Sequelize, Op } = require("sequelize");
const sequelizeConnection = require("../../config/connection").DBconnection;
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
  // var AppUserModel = UserRoleModel.belongsTo(UserModel, {sourceKey: 'id', foreignKey : 'userId'});
  // UserRoleModel.belongsTo(RoleModel, {sourceKey: 'id', foreignKey : 'roleId'});
  // UserModel.belongsToMany(RoleModel, {
  //     through: UserRoleModel,
  //     foreignKey : 'userId'
  // });
  // UserModel.belongsToMany(WorkspaceModel, {
  //     through: UserWorkspaceModel,
  //     foreignKey : 'userId'
  // });
  return UserModel.findAll({
    include: [
      {
        model: RoleModel,
      },
      //   {
      //     model: WorkspaceModel,
      //   },
    ],
  });
  //   return UserRoleModel.findAll({
  //     include: [
  //       {
  //         model: UserModel,
  //       },
  //       {
  //         model: RoleModel,
  //       },
  //       // {
  //       //   model: WorkspaceModel,
  //       // },
  //     ],
  //   });
};
