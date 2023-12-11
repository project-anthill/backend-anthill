import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { RequestConnectionUserDTO } from '../../DTOs/requestConnectionUser.dto';
import { PrismaErrorHandler } from 'src/shared/utils/prisma-error.handler';
import { ResponseHandler } from 'src/shared/utils/response.handler';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RequestConnectionUseCase {
  constructor(
    private userService: UserService,
  ) {}

  async execute(request: RequestConnectionUserDTO): Promise<ResponseHandler> {
    try {
      const checkExists = await this.userService.findRequest(request)

      if(checkExists){
        await this.userService.resendRequest(checkExists.id);
        return {
          message: 'request sent back',
          status: '204'
        }
      }

      const response = await this.userService.createRequestConnection(request);
      if(!response) throw new BadRequestException('Não foi possível enviar a solicitação!')
      return {
        message: 'success',
        status: '204'
      }
    } catch (error) {
      if(error instanceof PrismaClient) PrismaErrorHandler(error);
      return {
        message: 'failed sending the request',
        status: '400'
      }
    }
  }
}
