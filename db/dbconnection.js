const Sequelize = require('sequelize');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
  }
);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
  sequelize.sync();
  console.log("Table created");
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;
