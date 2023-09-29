import { Root } from 'joi';
export const Joi = require('joi').extend(require('@joi/date')) as Root;