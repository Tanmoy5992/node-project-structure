
const Workspace = sequelize.define('workspace', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement :true ,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Workspace
