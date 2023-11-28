import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUseCase } from './useCases/login/login.useCase';
import { LoginFakeUseCase } from './useCases/loginFake/loginFake.useCase';
import { UserProfileService } from '../user/services/userProfile.service';
import { JWTService } from './utils/jwt.service';
import { PrismaService } from 'src/shared/config/prisma.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [LoginUseCase, LoginFakeUseCase, JWTService, UserProfileService, PrismaService],
})
export class AuthModule {}
