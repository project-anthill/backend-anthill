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
import { UserConnectionsController } from './controllers/userConnections.controller';
import { RequestConnectionUseCase } from './useCases/requestConnection/requestConnection.useCase';
import { FindUserReceivedRequestsUseCase } from './useCases/findUserReceivedRequests/findeUserReceivedRequests.useCase';
import { FindUserSentRequestsUseCase } from './useCases/findUserSentRequests/findUserSentRequests.useCase';

@Module({
  imports: [],
  controllers: [UserController, UserConnectionsController],
  providers: [
    CreateUserUseCase,
    UserService,
    UserProfileService,
    PrismaService,
    FindUniqueUserUseCase,
    RequestConnectionUseCase,
    FindManyUserUseCase,
    DeactiveUserUseCase,
    UpdateUserUseCase,
    FindUserReceivedRequestsUseCase,
    FindUserSentRequestsUseCase
  ],
})
export class UserModule {}
