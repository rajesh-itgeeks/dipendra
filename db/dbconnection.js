const Sequelize = require('sequelize');
//const Store = require('../model/userModel')
//const Title = require('../model/productModel')
const sequelize = new Sequelize('Nodejs', 'akash-1', 'postgres', {
  host: 'localhost',
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