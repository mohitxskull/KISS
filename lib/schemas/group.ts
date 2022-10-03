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
