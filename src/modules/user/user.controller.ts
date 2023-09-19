import { Body, Controller, Post} from '@nestjs/common';
import { CreateUserUseCaseDTO } from './useCases/create/createUser.dto';
import { CreateUserUseCase } from './useCases/create/createUser.useCase';

@Controller('user')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateUserUseCaseDTO) {
    const { id } = await this.createUserUseCase.handle(body);
    return { id };
  }
}