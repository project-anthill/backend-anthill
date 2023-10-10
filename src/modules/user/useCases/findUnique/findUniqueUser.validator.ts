import { Joi } from 'src/shared/utils/joi';
import { IFindUniqueUserRequest } from './findUniqueUser.interface';

export const FindUniqueUserSchema = Joi.object<IFindUniqueUserRequest>({
  userId: Joi.string().uuid().optional(),
  username: Joi.string().min(2).max(50).optional().alphanum(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(10).max(11).optional(),
});