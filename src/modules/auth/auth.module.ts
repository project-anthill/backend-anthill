import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUseCase } from './useCases/login/login.useCase';
import { LoginFakeUseCase } from './useCases/loginFake/loginFake.useCase';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [LoginUseCase, LoginFakeUseCase],
})
export class AuthModule {}
