const { Sequelize, DataTypes } = require('sequelize');

const DBconnection = new Sequelize({
  database: 'database_development',
  username: 'root',
  password: '',
  host: 'localhost',
  dialect: 'mysql'
});

const db = {}

db.Sequelize = Sequelize
db.DBconnection = DBconnection

const userModel = require('../app/model/user');
const user =  userModel(DBconnection, Sequelize);

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
    console.log('sync err')
  })

  

module.exports ={ DBconnection,db};