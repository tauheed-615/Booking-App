const Sequelize = require("sequelize");

const sequelize = new Sequelize("book", "root", "Siddiqui@615", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
