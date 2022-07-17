const {Sequelize,Op} = require('sequelize');
const sequelizeConnection = require('../../config/connection').DBconnection;
const UserModel = require('../schema/user.schema')(sequelizeConnection, Sequelize.DataTypes,Sequelize.Model);

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

exports.updateAnyRecord = (updatedata, wheredata = {}) => { 
    console.log(updatedata);  
    console.log(wheredata);      
    return UserModel.update(updatedata,wheredata);
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// module.exports = (sequelize, DataTypes, Model ) => {
//     const User = sequelize.define('user', {
//       userID: {
//         type: DataTypes.INTEGER,
//         primaryKey : true,
//         autoIncrement :true ,
//         allowNull: false
//       },
//       userName: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: true
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: true
//       },
//       phoneNumber: {
//         type: DataTypes.STRING,
//         allowNull: true
//       },
//       emergencyContact: {
//         type: DataTypes.STRING,
//         allowNull: true
//       },
//       verified: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false
//       }
//     })
  
//     return User
//   }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  async function addNewRecord(dataobj) {
//     return User.build(dataobj).save();
// }



// export function addNewRecord(dataobj){
//     return User.build(dataobj).save();
// }

//export default {addNewRecord}
// const { Sequelize,DataTypes }  = require('sequelize');
// const sequelize = require('../../config/connection');
// const User = sequelize.define('user',{
//     userID: {
//                 type: DataTypes.INTEGER,
//                 primaryKey : true,
//                 autoIncrement :true ,
//                 allowNull: false
//               },
//               userName: {
//                 type: DataTypes.STRING,
//                 allowNull: false
//               },
//               password: {
//                 type: DataTypes.STRING,
//                 allowNull: false
//               },
//               firstName: {
//                 type: DataTypes.STRING,
//                 allowNull: true
//               },
//               lastName: {
//                 type: DataTypes.STRING,
//                 allowNull: true
//               },
//               phoneNumber: {
//                 type: DataTypes.STRING,
//                 allowNull: true
//               },
//               emergencyContact: {
//                 type: DataTypes.STRING,
//                 allowNull: true
//               },
//               verified: {
//                 type: DataTypes.BOOLEAN,
//                 allowNull: false
//               }
// });

//  async function addNewRecord(dataobj) {
//     return User.build(dataobj).save();
// }

// module.exports = {User,addNewRecord};