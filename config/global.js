const { Sequelize, DataTypes } = require("sequelize");

const DBconnection = new Sequelize({
  database: process.env.DATABASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dialect: "mysql",
  logging: false
});

global.sequelize = DBconnection;
global.DataTypes = DataTypes;

(async () => {
  let dbTransaction = await sequelize.transaction();
  global.dbTransaction = dbTransaction;
})();