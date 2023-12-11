import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CreateUserUseCase } from '../useCases/createUser/createUser.useCase';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ICreateUserResponse } from '../useCases/createUser/createUser.interface';
import { JoiValidationPipe } from 'src/shared/utils/joi/joi-validation-pipe';
import { CreateUserSchema } from '../useCases/createUser/createUserSchema.validator';
import {
  IFindUniqueUserRequest,
  IFindUniqueUserResponse,
} from '../useCases/findUniqueUser/findUniqueUser.interface';
import { CreateUserDTO } from '../DTOs/createUser.dto';
import { FindUniqueUserUseCase } from '../useCases/findUniqueUser/findUniqueUser.useCase';
import { FindUniqueUserSchema } from '../useCases/findUniqueUser/findUniqueUser.validator';
import { Gender } from '@prisma/client';
import { FindManyUserUseCase } from '../useCases/findManyUser/findManyUser.useCase';
import {
  IFindManyUserRequest,
  IFindManyUserResponse,
} from '../useCases/findManyUser/findManyUser.interface';
import { DeactiveUserUseCase } from '../useCases/deactiveUser/deactiveUser.useCase';
import { UpdateUserDTO } from '../DTOs/updateUser.dto';
import { UpdateUserUseCase } from '../useCases/updateUser/updateUser.useCase';
import { ResponseHandler } from 'src/shared/utils/response.handler';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUniqueUserUseCase: FindUniqueUserUseCase,
    private readonly findManyUserUseCase: FindManyUserUseCase,
    private readonly deactiveUserUseCase: DeactiveUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @HttpCode(201)
  @Post('/')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  async create(@Body() body: CreateUserDTO): Promise<ICreateUserResponse> {
    return await this.createUserUseCase.execute(body);
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
    const userFound = await this.findUniqueUserUseCase.execute(query);
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
    const usersFound = await this.findManyUserUseCase.execute(query);
    return usersFound;
  }

  @HttpCode(201)
  @Delete(':userId')
  async deactive(@Param('userId') userId: string): Promise<ResponseHandler> {
    return await this.deactiveUserUseCase.execute(userId);
  }

  @HttpCode(204)
  @Put(':userId')
  async update(@Param('userId') userId: string, @Body() request: UpdateUserDTO): Promise<any>{
    await this.updateUserUseCase.execute(userId, request)
  }
}
