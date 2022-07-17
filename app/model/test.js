const {Sequelize,Op} = require('sequelize');
const sequelizeConnection = require('../../config/connection').DBconnection;
const UserModel = require('./user')(sequelizeConnection, Sequelize.DataTypes,Sequelize.Model);

exports.findByAny = (dataobj) => {
    return UserModel.findOne(dataobj);
}

exports.addNewRecord = (dataobj) => {
    return UserModel.create(dataobj);
};

exports.getAllRecord=(search_str,pageLimit, offset)=>{
      
    return  UserModel.findAndCountAll({                    
        order: [
            ['userID', 'DESC']
        ],
        limit: pageLimit,
        offset: offset

    });        
}