import { Body, Controller, HttpCode, Post} from '@nestjs/common';
import { CreateUserUseCase } from './useCases/create/createUser.useCase';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  @HttpCode(201)
  @Post('/')
  async create(@Body() body: any) {
    const { id } = await this.createUserUseCase.handle();
    return { id };
  }
}