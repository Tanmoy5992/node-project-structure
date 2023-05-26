const userRoleModel = require('./user.role.schema');
const roleModel = require('./role.schema');
module.exports = (sequelize, DataTypes, Model ) => {
    const User = sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement :true ,
        allowNull: false
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      emergencyContact: {
        type: DataTypes.STRING,
        allowNull: true
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    })

    // User.associate = function(models) {
    //   // associations can be defined here
    //   User.belongsToMany(roleModel, {
    //       through: userRoleModel,
    //       foreignKey : 'userId'
    //   });
    // };
  
    return User
  }
