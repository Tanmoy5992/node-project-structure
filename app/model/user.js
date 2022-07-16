module.exports = (sequelize, DataTypes, Model ) => {
    const User = sequelize.define('user', {
      userID: {
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
  
    return User
  }


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