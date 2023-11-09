import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import {
  ICreateUserRequest,
  ICreateUserResponse,
} from './createUser.interface';
import { UserProfileService } from '../../services/userProfile.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class CreateUserUseCase {
  constructor(
    private userService: UserService,
    private userProfileService: UserProfileService,
  ) {}
  async handler(request: ICreateUserRequest): Promise<ICreateUserResponse> {
    try {
      const createdUser = await this.userService.create();
      await this.userProfileService.create(request, createdUser);
      if (createdUser.isActive == true)
        delete createdUser.deactivatedAt && delete createdUser.deactivatedById;
      return createdUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma request errors (e.g., unique constraint violation)
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        // Handle unknown Prisma request errors
        throw new HttpException(
          'An unexpected error occurred while creating the user.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        // Handle validation errors
        throw new HttpException(
          'Validation failed. Please check your input data.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        // Handle other unexpected errors
        throw new HttpException(
          'An unexpected error occurred.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
