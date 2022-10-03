import Joi from 'joi';

export const ADMINACCESSURL = Joi.string()
  .min(3)
  .max(50)
  .pattern(/^[a-zA-Z0-9_-]*$/)
  .message('Only "0-9 a-z A-Z _ -" allowed')
  .required();

export const USERNAME = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .message('Invalid username')
  .required();

export const PASS = Joi.string().min(3).max(40).required();
export const HASHEDPASS = Joi.string()
  .min(50)
  .max(70)
  .pattern(/^[a-zA-Z0-9$/.]*$/)
  .message('Only "0-9 a-z A-Z $ . /" allowed')
  .required();
