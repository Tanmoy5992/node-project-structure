const UserModel = require("../app/schema/user.schema");
const RoleModel = require("../app/schema/role.schema");
const UserRoleModel = require("../app/schema/user.role.schema");
const WorkspaceModel = require("../app/schema/workspace");
const UserWorkspaceModel = require("../app/schema/user.workspace.schema");

RoleModel.belongsToMany(UserModel, {
  through: UserRoleModel,
  foreignKey: "roleId",
});

UserModel.belongsToMany(RoleModel, {
  through: UserRoleModel,
  foreignKey: "userId",
});

UserModel.belongsToMany(WorkspaceModel, {
  through: UserWorkspaceModel,
  foreignKey: "userId",
});