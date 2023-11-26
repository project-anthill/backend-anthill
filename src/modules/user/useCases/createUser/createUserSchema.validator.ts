import { Joi } from 'src/shared/utils/joi';
import { CreateUserDTO } from '../../DTOs/createUser.dto';
import { Gender } from '@prisma/client';

export const CreateUserSchema = Joi.object<CreateUserDTO>({
  username: Joi.string().min(2).max(50).required().alphanum(),
  email: Joi.string().email().required(),
  firstName: Joi.string().min(2).max(50).required().alphanum(),
  lastName: Joi.string().min(2).max(100).required().alphanum(),
  birthDate: Joi.date(),
  gender: Joi.string()
    .valid(Gender.male, Gender.female, Gender.nonBinary,
    Gender.other, Gender.prefererNotToSay)
    .required(),
  phone: Joi.string().min(10).max(11).required(),
  password: Joi.string().min(8).max(32).regex(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,?~\\=|\.\-])(?=.*[a-z])(?=.*[A-Z])/)
  .messages({'string.pattern.base': `Password must contain at least one special character, one lowercase letter, and one uppercase letter!`}).required(),
});