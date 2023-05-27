const userRoleModel = require("./user.role.schema");
const userModel = require("./user.schema");
// module.exports = (sequelize, DataTypes, Model ) => {
const Role = sequelize.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//   Role.associate = function(models) {
//     // associations can be defined here
//     Role.belongsToMany(userModel, { through: userRoleModel, foreignKey : 'roleId' });

// };

module.exports = Role;
// }
