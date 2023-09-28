import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './useCases/create/createUser.useCase';
import { UserService } from './services/user.service';
import { PrismaService } from 'src/shared/config/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserUseCase, UserService, PrismaService],
})
export class UserModule {}
