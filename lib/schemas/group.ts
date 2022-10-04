import Joi from 'joi';
import { HASHEDPASS, PASS, USERNAME } from './world';

export const SetupInfoSchema = Joi.object({
  Username: USERNAME,
  Password: PASS,
  ConfirmPassword: Joi.any()
    .valid(Joi.ref('Password'))
    .messages({ 'any.only': 'Passwords do not match' }),
});

export const SetupInfoSchemaServer = Joi.object({
  Username: USERNAME,
  Password: HASHEDPASS,
});

export const UpdateConfigSchema = Joi.object({
  _id: Joi.string().min(0).max(10).required(),
  name: Joi.string().min(3).max(20).required(),
  links: Joi.array().items(Joi.string().min(0).max(100).required()),
  proxy: Joi.boolean().required(),
  active: Joi.boolean().required(),
  createdAt: Joi.number().min(999).max(999999999999999).required(),
  updatedAt: Joi.number().min(999).max(999999999999999).required(),
  options: Joi.object({
    xfwd: Joi.boolean().required(),
    changeOrigin: Joi.boolean().required(),
    followRedirects: Joi.boolean().required(),
    proxyTimeout: Joi.number().min(10000).max(60000).required(),
    timeout: Joi.number().min(10000).max(60000).required(),
  }).required(),
});
