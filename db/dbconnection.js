const Sequelize = require('sequelize');
//const Store = require('../model/userModel')
//const Title = require('../model/productModel')
const sequelize = new Sequelize(POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  dialect: 'postgres'
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
  sequelize.sync()
  //await sequelize.sync();
  console.log("create table")
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;