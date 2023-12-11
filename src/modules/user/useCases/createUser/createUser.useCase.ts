import { Injectable } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import {
  ICreateUserRequest,
  ICreateUserResponse,
} from './createUser.interface';
import { UserProfileService } from '../../services/userProfile.service';
import * as bcrypt from 'bcrypt';
import { PrismaErrorHandler } from 'src/shared/utils/prisma-error.handler';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class CreateUserUseCase {
  constructor(
    private userService: UserService,
    private userProfileService: UserProfileService,
  ) {}
  async execute(request: ICreateUserRequest): Promise<ICreateUserResponse> {
    try {
      const hashedPass = bcrypt.hashSync(request.password, 10);
      const createdUser = await this.userService.create();
      request.password = hashedPass;
      
      await this.userProfileService.create(request, createdUser);

      if (createdUser.isActive == true)
        delete createdUser.deactivatedAt && delete createdUser.deactivatedById;

      return createdUser;
    } catch (error) {
      if(error instanceof PrismaClient) PrismaErrorHandler(error);
    }
  }
}
