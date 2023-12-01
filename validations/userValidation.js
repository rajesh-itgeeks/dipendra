const schema = require('./schema/userSchema');
const statusCode = require('../constant/statusCode.js');

exports.createValidation = async (req, res, next) => {
  const { error } = schema.createSchema.validate(req.body);
  if (error) {
    res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
  } else {
    next();
  }
};

// for param id validation
exports.paramId = async = (req, res, next) => {
    const { error } = schema.paramIdSchema.validate({id:req.params.id});
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
  }

  exports.usersList = async (req, res, next) => {
    const { error } = schema.usersListSchema.validate(req.query);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}