
require("./association")

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("sync done");
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log("sync err");
//   });

module.exports = { sequelize };
