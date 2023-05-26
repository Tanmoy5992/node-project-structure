const userModel = require('./user.schema');
const roleModel = require('./role.schema');

module.exports = (sequelize, DataTypes, Model ) => {
    const UserRole = sequelize.define('userroles', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement :true ,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    })

    // UserRole.associate = function(models) {
    //     // associations can be defined here
    //     // UserRole.hasMany(userModel, {
    //     //     sourceKey: 'id',
    //     //     foreignKey: 'userId'
    //     // });
    //     // UserRole.hasMany(roleModel,{
    //     //     sourceKey: 'id',
    //     //     foreignKey: 'roleId'
    //     // });
    //     //UserRole.belongsTo(userModel, {sourceKey: 'id', foreignKey : 'userId'});
    //     UserRole.belongsTo(UserModel, {sourceKey: 'id', foreignKey : 'userId'});
    // //   Role.belongsToMany(models.userModel, {
    // //     through: UserRole
    // // });
    // };
  
    return UserRole
  }

  