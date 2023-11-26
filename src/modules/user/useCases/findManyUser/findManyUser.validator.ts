import { Joi } from 'src/shared/utils/joi';
import { Gender } from '@prisma/client';
import { IFindManyUserRequest } from './findManyUser.interface';

export const FindManyUserSchema = Joi.object<IFindManyUserRequest>({
  birthDate: Joi.date().optional(),
  gender: Joi.string()
    .valid(Gender.male, Gender.female, Gender.nonBinary,
    Gender.other, Gender.prefererNotToSay)
    .optional(),
});