import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserUseCaseDTO } from './createUser.dto';
import { generateUUID } from 'src/shared/utils/generateUUID';
import { UserRepository } from '../../repository/user.repository';
@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository
  ) {}

  async handle({
    email,
    password,
    cpf,
    firstName,
    lastName,
    birthDate,
    gender,
    type,
  }: CreateUserUseCaseDTO) {
    const User = await this.userRepository.create({
      id: generateUUID(),
      email: email,
      password: password,
      cpf: cpf,
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      gender: gender,
      isActive: true,
      type,
    });

    return { id: User.id };
  }
}