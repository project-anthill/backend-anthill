import { Body, Controller, Post} from '@nestjs/common';
import { CreateUserUseCase } from './useCases/create/createUser.useCase';

@Controller('user')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  @Post('/')
  async create(@Body() body: any) {
    const { id } = await this.createUserUseCase.handle();
    return { id };
  }
}