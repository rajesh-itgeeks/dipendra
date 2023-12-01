const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbconnection');

const Store = sequelize.define('user', {
    Id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    userName:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    phoneNumber:{
      type:DataTypes.TEXT 
    }
},   
 {}
 );

// `sequelize.define` also returns the model
console.log(Store === sequelize.models.Store); // true
module.exports = Store;