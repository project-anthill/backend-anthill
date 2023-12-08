import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUseCase } from './useCases/login/login.useCase';
import { LoginInputDTO, LoginOutputDTO } from './DTOs/login.dto';
import { LoginFakeUseCase } from './useCases/loginFake/loginFake.useCase';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly loginFakeUseCase: LoginFakeUseCase
    ) {}

  @HttpCode(201)
  @Post('/login')
  async login(@Body() body: LoginInputDTO) {
    return await this.loginFakeUseCase.handle();
  }

  @HttpCode(201)
  @Post('/login-working')
  async loginWorking(@Body() body: LoginInputDTO): Promise<LoginOutputDTO> {
    return await this.loginUseCase.handle(body);
  }

  @HttpCode(200)
  @Post('/refresh-token')
  async refreshToken() {
    return;
  }
}
