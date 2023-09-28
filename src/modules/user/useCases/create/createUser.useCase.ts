import { Injectable } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { user as UserModel } from '@prisma/client';
@Injectable()
export class CreateUserUseCase {
  constructor(
    private userService: UserService
  ) {}

  async handle(): Promise<UserModel> {
    const createdUser = await this.userService.create({});
    return createdUser;
  }
}