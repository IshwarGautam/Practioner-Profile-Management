import Joi from "joi";

const validator = (schema: any) => (payload: object) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

const practitionerSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  contact: Joi.number().min(10).required(),
  dob: Joi.date().required(),
  workingDays: Joi.number().min(1).max(7).required(),
  startTime: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .required(),
  endTime: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .required(),
});

exports.validateSignup = validator(signupSchema);
exports.validateSignin = validator(signinSchema);
exports.validatePractitioner = validator(practitionerSchema);
