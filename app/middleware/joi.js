const Joi = require("joi");

let validator = {};

validator.registerSchema = function(req, res, next) {
  let schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(3).required().email(),
    mobile: Joi.number().required(),
    authType: Joi.number().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.number().required(),
    location: Joi.object().required(),
    academyId: Joi.string()
  });

  let validatedRes = schema.validate(req.body);
  if (validatedRes.error) {
    const { error } = validatedRes;
    const formattedErrors = error.details.map(detail => ({
      field: detail.path.join("."),
      message: detail.path.join(".") + " is required"
    }));
    return res.status(400).json({ status: 400, error: formattedErrors[0] });
  }
  next();
};

validator.adminRegisterSchema = function(req, res, next) {
  let schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }).unknown();

  let validatedRes = schema.validate(req.body);
  if (validatedRes.error) {
    const { error } = validatedRes;
    const formattedErrors = error.details.map(detail => ({
      field: detail.path.join("."),
      message: detail.path.join(".") + " is required"
    }));
    return res.status(400).json({ status: 400, error: formattedErrors[0] });
  }
  next();
};

validator.loginSchema = function(req, res, next) {
  let schema = Joi.object({
    mobile: Joi.number().required()
  });

  let validatedRes = schema.validate(req.body);
  if (validatedRes.error) {
    const { error } = validatedRes;
    const formattedErrors = error.details.map(detail => ({
      field: detail.path.join("."),
      message: detail.path.join(".") + " is required"
    }));
    return res.status(400).json({ status: 400, error: formattedErrors[0] });
  }
  next();
};

validator.adminLoginSchema = function(req, res, next) {
  let schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  let validatedRes = schema.validate(req.body);
  if (validatedRes.error) {
    const { error } = validatedRes;
    const formattedErrors = error.details.map(detail => ({
      field: detail.path.join("."),
      message: detail.path.join(".") + " is required"
    }));
    return res.status(400).json({ status: 400, error: formattedErrors[0] });
  }
  next();
};

module.exports = validator;
