import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from './useCases/createUser/createUser.useCase';
import { UserService } from './services/user.service';
import { PrismaService } from 'src/shared/config/prisma.service';
import { UserProfileService } from './services/userProfile.service';
import { FindUniqueUserUseCase } from './useCases/findUniqueUser/findUniqueUser.useCase';
import { FindManyUserUseCase } from './useCases/findManyUser/findManyUser.useCase';
import { DeactiveUserUseCase } from './useCases/deactiveUser/deactiveUser.useCase';
import { UpdateUserUseCase } from './useCases/updateUser/updateUser.useCase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    UserService,
    UserProfileService,
    PrismaService,
    FindUniqueUserUseCase,
    FindManyUserUseCase,
    DeactiveUserUseCase,
    UpdateUserUseCase,
  ],
})
export class UserModule {}
