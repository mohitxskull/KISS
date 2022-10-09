import Joi from 'joi';
import { MinPassLength } from '../consts';

export const EMAIL = Joi.string()
  .email({ tlds: { allow: false } })
  .message('Invalid email');

export const PASSWORD = Joi.string().min(MinPassLength).max(50);
