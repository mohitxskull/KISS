import Joi from 'joi';

export const EMAIL = Joi.string()
  .email({ tlds: { allow: false } })
  .message('Invalid email');

export const PASSWORD = Joi.string().min(6).max(50);
