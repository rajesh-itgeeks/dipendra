const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const multer = require('multer')
const path = require('path');
const controllers = require('./routeController/userController');
const controller = require('./routeController/controller');
const validations = require('./validations/userValidation')


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*'); // Adjust this to your React app's domain in production
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });


app.post('/user', validations.createValidation, controllers.createUser);
app.put('/user/:id', validations.paramId, controllers.updateUser);
app.delete('/user/:id', validations.paramId, controllers.deleteUser);
app.get('/user', validations.usersList, controllers.getList);


app.listen(3032, () => {
  console.log("Listening port 3032")
})