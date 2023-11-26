import { user as User } from '@prisma/client';
import { CreateUserDTO } from '../../DTOs/createUser.dto';

export interface ICreateUserRequest extends CreateUserDTO {}

export interface ICreateUserResponse extends Pick<User, "id"> {}