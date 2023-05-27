// const { Sequelize, DataTypes } = require("sequelize");

// const DBconnection = new Sequelize({
//   database: process.env.DATABASE,
//   username: process.env.USER,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   dialect: "postgres",
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.DBconnection = DBconnection;

// const UserModel = require("../app/schema/user.schema")(
//   DBconnection,
//   DataTypes,
//   ""
// );
// const RoleModel = require("../app/schema/role.schema")(
//   DBconnection,
//   DataTypes,
//   ""
// );
// const UserRoleModel = require("../app/schema/user.role.schema")(
//   DBconnection,
//   DataTypes,
//   ""
// );
// const WorkspaceModel = require("../app/schema/workspace")(
//   DBconnection,
//   DataTypes,
//   ""
// );
// const UserWorkspaceModel = require("../app/schema/user.workspace.schema")(
//   DBconnection,
//   DataTypes,
//   ""
// );

const UserModel = require("../app/schema/user.schema");
const RoleModel = require("../app/schema/role.schema");
const UserRoleModel = require("../app/schema/user.role.schema");
// const WorkspaceModel = require("../app/schema/workspace");
// const UserWorkspaceModel = require("../app/schema/user.workspace.schema");

RoleModel.belongsToMany(UserModel, {
  through: UserRoleModel,
  // through: "user_r",
  foreignKey: "roleId",
  // targetKey: "id",
  // foreignKey: "userId",
  // sourceKey: "id",
  // as: "users",
});

UserModel.belongsToMany(RoleModel, {
  through: UserRoleModel,
  // through: "user_r",
  // sourceKey: "id",
  foreignKey: "userId",
  // targetKey: "id",
  // as: "roles",
  // foreignKey: "roleId",
  // as: "userId"
});
UserRoleModel.hasMany(RoleModel, { foreignKey: "roleId" });
UserRoleModel.hasMany(UserModel, { foreignKey: "userId" });
// UserModel.belongsToMany(WorkspaceModel, {
//   through: UserWorkspaceModel,
//   foreignKey: "userId",
// });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("sync done");
  })
  .catch((err) => {
    console.log(err);
    console.log("sync err");
  });

module.exports = { sequelize };
