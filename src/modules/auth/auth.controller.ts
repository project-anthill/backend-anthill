import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUseCase } from './useCases/login/login.useCase';
import { LoginDTO } from './DTOs/login.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @HttpCode(201)
  @Post('/login')
  async login(@Body() body: LoginDTO) {
    return await this.loginUseCase.handle();
  }

  @HttpCode(200)
  @Post('/refresh-token')
  async refreshToken() {
    return;
  }
}
