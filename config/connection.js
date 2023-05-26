const { Sequelize, DataTypes } = require('sequelize');

const DBconnection = new Sequelize({
  database: process.env.DATABASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dialect: 'mysql',
  logging: false
});

const db = {}

db.Sequelize = Sequelize
db.DBconnection = DBconnection

require('../app/schema/user.schema')(DBconnection, DataTypes);
require('../app/schema/role.schema')(DBconnection, DataTypes);
require('../app/schema/user.role.schema')(DBconnection, DataTypes);
require('../app/schema/workspace')(DBconnection, DataTypes);
require('../app/schema/user.workspace.schema')(DBconnection, DataTypes);

DBconnection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  db.DBconnection.sync({ alter: true })
  .then(() => {
    console.log('sync done')
  })
  .catch(err=>{
    console.log(err)
    console.log('sync err')
  })

  

module.exports ={ DBconnection,db};