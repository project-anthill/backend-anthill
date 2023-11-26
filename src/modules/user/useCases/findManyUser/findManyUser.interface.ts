import { user as User, userProfile as UserProfile } from '@prisma/client';

export interface IFindManyUserRequest 
extends Partial<Pick<UserProfile, "birthDate" | "gender">>{}

export interface IFindManyUserResponse 
extends Omit<UserProfile, "id" | "password">{}   