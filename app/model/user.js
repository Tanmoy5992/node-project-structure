module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userName: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      phoneNumber: {
        type: DataTypes.STRING
      },
      emergencyContact: {
        type: DataTypes.STRING
      },
      verified: {
        type: DataTypes.BOOLEAN
      }
    })
  
    return User
  }