import { user as User } from '@prisma/client';
import { CreateUserDTO } from '../../DTOs/createUser.dto';

export interface CreateUserRequest extends CreateUserDTO {}

export interface CreateUserResponse extends Pick<User, "id"> {}