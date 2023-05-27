const { Sequelize, DataTypes } = require("sequelize");

const DBconnection = new Sequelize({
  database: process.env.DATABASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dialect: "mysql",
});

console.log({
  database: process.env.DATABASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dialect: "postgres",
});

// const db = {};

// db.Sequelize = Sequelize;
// db.DBconnection = DBconnection;

// global.db = db;
global.sequelize = DBconnection;
global.DataTypes = DataTypes;

// module.exports = {
//   db: db,
//   sequelize: DBconnection,
//   DataTypes,
// };
