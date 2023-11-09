import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CreateUserUseCase } from './useCases/create/createUser.useCase';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ICreateUserResponse } from './useCases/create/createUser.interface';
import { JoiValidationPipe } from 'src/shared/utils/joi/joi-validation-pipe';
import { CreateUserSchema } from './useCases/create/createUserSchema.validator';
import {
  IFindUniqueUserRequest,
  IFindUniqueUserResponse,
} from './useCases/findUnique/findUniqueUser.interface';
import { CreateUserDTO } from './DTOs/createUser.dto';
import { FindUniqueUserUseCase } from './useCases/findUnique/findUniqueUser.useCase';
import { FindUniqueUserSchema } from './useCases/findUnique/findUniqueUser.validator';
import { Gender } from '@prisma/client';
import { FindManyUserUseCase } from './useCases/findMany/findManyUser.useCase';
import {
  IFindManyUserRequest,
  IFindManyUserResponse,
} from './useCases/findMany/findManyUser.interface';
import { DeactiveUserUseCase } from './useCases/deactive/deactiveUser.useCase';
import { string } from 'joi';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUniqueUserUseCase: FindUniqueUserUseCase,
    private readonly findManyUserUseCase: FindManyUserUseCase,
    private readonly deactiveUserUseCase: DeactiveUserUseCase,
  ) {}

  @HttpCode(201)
  @Post('/')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  async create(@Body() body: CreateUserDTO): Promise<ICreateUserResponse> {
    return await this.createUserUseCase.handler(body);
  }

  @HttpCode(200)
  @Get('/findUnique')
  @ApiQuery({ name: 'userId', type: String, required: false })
  @ApiQuery({ name: 'username', type: String, required: false })
  @ApiQuery({ name: 'email', type: String, required: false })
  @ApiQuery({ name: 'phone', type: String, required: false })
  @UsePipes(new JoiValidationPipe(FindUniqueUserSchema))
  async findUnique(
    @Query() query: IFindUniqueUserRequest,
  ): Promise<IFindUniqueUserResponse> {
    const userFound = await this.findUniqueUserUseCase.handler(query);
    return userFound;
  }

  @HttpCode(200)
  @Get('/findMany')
  @ApiQuery({
    name: 'birthDate',
    type: String,
    example: '1990-01-15T12:00:00.000Z',
    description:
      'Change only the date until the "T" (Im having a problem with date format of prisma)',
    required: false,
  })
  @ApiQuery({ name: 'gender', enum: Gender, required: false })
  async findMany(
    @Query() query: IFindManyUserRequest,
  ): Promise<IFindManyUserResponse[]> {
    const usersFound = await this.findManyUserUseCase.handler(query);
    return usersFound;
  }

  @HttpCode(201)
  @Delete(':userId')
  async deactive(@Param('userId') userId: string): Promise<any> {
    await this.deactiveUserUseCase.handler(userId);
  }
}
