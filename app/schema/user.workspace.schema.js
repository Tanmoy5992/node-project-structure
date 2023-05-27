

const UserWorkspace = sequelize.define('userworkspace', {
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
  workspaceId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

module.exports = UserWorkspace
  