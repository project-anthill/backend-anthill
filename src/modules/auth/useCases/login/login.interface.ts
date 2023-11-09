import { user as User, userProfile as UserProfile } from '@prisma/client';
import { LoginDTO } from '../../DTOs/login.dto';

export interface ILogin {}

export interface ILoginResponse extends Omit<UserProfile, 'id' | 'password'> {}
