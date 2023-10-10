import { user as User, userProfile as UserProfile } from '@prisma/client';

export interface IFindUniqueUserRequest 
extends Partial<Pick<UserProfile, "userId" | "email" | "username" | "phone">>{}

export interface IFindUniqueUserResponse 
extends Omit<User, "deactivatedAt" | "deactivatedBy">,
        Omit<UserProfile, "id" | "userId" | "password">{}   