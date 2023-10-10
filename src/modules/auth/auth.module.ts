import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUseCase } from './useCases/login/login.useCase';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [LoginUseCase],
})
export class AuthModule {}
