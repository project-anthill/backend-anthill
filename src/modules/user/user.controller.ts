import { Body, Controller, Get, HttpCode, Param, Post, UsePipes} from '@nestjs/common';
import { CreateUserUseCase } from './useCases/create/createUser.useCase';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRequest, CreateUserResponse } from './useCases/create/createUser.interface';
import { CreateUserDTO } from './DTOs/createUser.dto';
import { JoiValidationPipe } from 'src/shared/utils/joi/joi-validation-pipe';
import { CreateUserSchema } from './useCases/create/createUserSchema.validator';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  @HttpCode(201)
  @Post('/')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  async create(@Body() body: CreateUserRequest): Promise<CreateUserResponse> {
    const { id } = await this.createUserUseCase.handle(body);
    return { id };
  }

  // @HttpCode(200)
  // @Get('/:id')
  // async findOne(@Param('id') id: Pick<user, "id">): Promise<FindOneUserResponse>{
  //   const userFound = await this.
  // }


}