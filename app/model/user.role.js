const {Sequelize,Op} = require('sequelize');
const sequelizeConnection = require('../../config/connection').DBconnection;
const UserModel = require('../schema/user.schema')(sequelizeConnection, Sequelize.DataTypes,Sequelize.Model);
const UserRoleModel = require('../schema/user.role.schema')(sequelizeConnection, Sequelize.DataTypes,Sequelize.Model);

exports.findAllData = () => {
    var AppUserModel = UserRoleModel.belongsTo(UserModel, {sourceKey: 'id', foreignKey : 'userId'});
    return UserRoleModel.findAll({ 
        include: [
            {
                model:UserModel
            }
        ] 
    });
}

