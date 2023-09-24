const Joi = require("joi");

let validator = {};

validator.registerSchema = function(req, res, next) {
  let schema = Joi.object({
    email: Joi.string().min(3).required().email(),
    mobile: Joi.number().required(),
    authType: Joi.number().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.number().required(),
    location: Joi.object().required(),
    academyId: Joi.string().allow(null),
    academyName: Joi.string().allow(null),
    name: Joi.string()
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

validator.verifySchema = function(req, res, next) {
  let schema = Joi.object({
    number: Joi.number().required(),
    code: Joi.number().required()
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

validator.bannerSchema = function(req, res, next) {
  let schema = Joi.object({
    wBanner: Joi.string().required()
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

validator.categorySchema = function(req, res, next) {
  let schema = Joi.object({
    sport: Joi.string().required(),
    image: Joi.string().required()
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

validator.testimonialSchema = function(req, res, next) {
  let schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    comment: Joi.string().required()
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

validator.partnerSchema = function(req, res, next) {
  let schema = Joi.object({
    image: Joi.string().required()
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

validator.academyProfileSchema = function(req, res, next) {
  let schema = Joi.object({
    about: Joi.string().required(),
    logo: Joi.string().required(),
    academyImage: Joi.string().required(),
    sportsCount: Joi.number().required(),
    successRate: Joi.number().required(),
    students: Joi.number().required(),
    coachCount: Joi.number().required(),
    sports: Joi.array().required()
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

validator.playerProfileSchema = function(req, res, next) {
  let schema = Joi.object({
    about: Joi.string().required(),
    profilePicture: Joi.string().required(),
    game: Joi.string().required(),
    playing: Joi.string().required(),
    backgroundImage: Joi.string().required(),
    carrierStartedAt: Joi.string().required(),
    goal: Joi.string().required(),
    reasonToChoosePart: Joi.string().required(),
    requirementFromSponcers: Joi.string().required(),
    age: Joi.number().required(),
    schoolCount: Joi.number().required(),
    tournmentsCount: Joi.number().required(),
    universityCount: Joi.number().required(),
    districtCount: Joi.number().required(),
    nationalsCount: Joi.number().required(),
    internationalsCount: Joi.number().required(),
    socialMediaLinks: Joi.array().required()
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

validator.notificationSchema = function(req, res, next) {
  let schema = Joi.object({
    sportId: Joi.string().required(),
    title: Joi.string().required(),
    image: Joi.string().required(),
    pdf: Joi.string().required()
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

validator.contactSchema = function(req, res, next) {
  let schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.string().required()
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

validator.uploadBannerSchema = function(req, res, next) {
  let schema = Joi.object({
    image: Joi.string().required()
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

validator.uploadVideoSchema = function(req, res, next) {
  let schema = Joi.object({
    image: Joi.string().required(),
    url: Joi.string().required(),
    title: Joi.string().required()
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

validator.createAchivement = function(req, res, next) {
  let schema = Joi.object({
    image: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string().required(),
    author: Joi.string().required()
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

validator.getAcademySchema = function(req, res, next) {
  let schema = Joi.object({
    page: Joi.number().required(),
    pageLimit: Joi.number().required(),
    sportId: Joi.string(),
    latitude: Joi.string(),
    longitude: Joi.string()
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

validator.updateStatus = function(req, res, next) {
  let schema = Joi.object({
    id: Joi.string().required(),
    isApproved: Joi.boolean().required()
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

validator.approveUpdatesSchema = function(req, res, next) {
  let schema = Joi.object({
    isApproved: Joi.boolean().required()
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

module.exports = validator;
