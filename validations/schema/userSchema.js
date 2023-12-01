const Joi = require('joi');

exports.createSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
   
});

exports.paramIdSchema = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
})

exports.usersListSchema = Joi.object({
    limit: Joi.number().optional().min(-1),
    offset: Joi.number().optional().min(0),
    query: Joi.string().allow('').optional()
})