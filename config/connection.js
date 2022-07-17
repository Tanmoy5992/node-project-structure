const { Sequelize, DataTypes } = require('sequelize');

const DBconnection = new Sequelize({
  database: process.env.DATABASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
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
    console.log(err)
    console.log('sync err')
  })

  

module.exports ={ DBconnection,db};