import Joi from 'joi';
import { emailRegex } from '../constants/auth.js';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(20).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(20).required(),
});

export const sendResetEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
