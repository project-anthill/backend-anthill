import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { UserProfileService } from '../../services/userProfile.service';
import { Prisma } from '@prisma/client';
import { IUpdateUserRequest } from './updateUser.interface';
@Injectable()
export class UpdateUserUseCase {
  constructor(
    private userProfileService: UserProfileService,
  ) {}
  async execute(userId: string, request: IUpdateUserRequest): Promise<any> {
    try {
      const userProfile = await this.userProfileService.findOne({ userId: userId })

      if(!userProfile) throw new NotFoundException('User not found!')

      return await this.userProfileService.update(userId, request,{
        firstName:userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        username: userProfile.username,
        phone: userProfile.phone,
      })

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new HttpException(
          'An unexpected error occurred while creating the user.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        throw new HttpException(
          'Validation failed. Please check your input data.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'An unexpected error occurred.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
